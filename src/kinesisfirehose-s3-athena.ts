import { Table, Database, Column, DataFormat } from '@aws-cdk/aws-glue';
import { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { CfnDeliveryStream } from '@aws-cdk/aws-kinesisfirehose';
import { Bucket } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export interface IFirehoseS3Athena {
  readonly bucketName: string;
  readonly roleName: string;
  readonly deliveryStreamName: string;
  readonly databaseName: string;
  readonly tableName: string;
  readonly prefix: string;
  readonly columns: Column[];
}

export class FirehoseS3Athena extends cdk.Construct {
  public readonly bucket: Bucket;
  public readonly firehoseRole: Role;
  public readonly delivery: CfnDeliveryStream;
  public readonly database: Database;
  public readonly table: Table;

  constructor(scope: cdk.Construct, id: string, props: IFirehoseS3Athena) {
    super(scope, id);

    this.bucket = new Bucket(this, `${id}-Bucket`, {
      bucketName: props.bucketName,
    });

    this.firehoseRole = new Role(
      this,
      props.roleName,
      {
        assumedBy: new ServicePrincipal('firehose.amazonaws.com'),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            'AmazonS3FullAccess',
          ),
        ],
      },
    );

    this.delivery = new CfnDeliveryStream(
      this,
      `${id}-Delivery`,
      {
        deliveryStreamName: props.deliveryStreamName,
        deliveryStreamType: 'DirectPut',
        s3DestinationConfiguration: {
          bucketArn: this.bucket.bucketArn,
          prefix: props.prefix,
          bufferingHints: {
            intervalInSeconds: 60,
            sizeInMBs: 5,
          },
          compressionFormat: 'GZIP',
          roleArn: this.firehoseRole.roleArn,
        },
      },
    );

    this.database = new Database(this, `${id}-Database`, {
      databaseName: props.databaseName,
    });
    this.table = new Table(this, `${id}-Table`, {
      database: this.database,
      tableName: props.tableName,
      columns: props.columns,
      dataFormat: DataFormat.JSON,
      bucket: this.bucket,
      s3Prefix: props.prefix,
    });
  }
}