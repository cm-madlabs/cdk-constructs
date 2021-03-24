import {
  Column,
  Database,
  DataFormat,
  Table,
} from '@aws-cdk/aws-glue';
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
} from '@aws-cdk/aws-iam';
import {
  CfnDeliveryStream,
} from '@aws-cdk/aws-kinesisfirehose';
import {
  Bucket,
} from '@aws-cdk/aws-s3';
import {
  Construct,
} from '@aws-cdk/core';

export interface IFirehoseS3Athena {
  /**
   * バケット名
   */
  readonly bucketName?: string;

  /**
   * IAMロール名
   */
  readonly roleName: string;

  /**
   * Firehose Delivery Stream名
   */
  readonly deliveryStreamName?: string;

  /**
   * Glueデータベース名
   */
  readonly databaseName: string;

  /**
   * Glueテーブル名
   */
  readonly tableName: string;

  /**
   * Athenaでクエリする対象となるS3バケットのパスprefix
   */
  readonly prefix: string;

  /**
   * Athenaでクエリするためのテーブルカラム
   */
  readonly columns: Column[];
}

/**
 * Kinesis Firehose経由でS3に保存してAthenaでクエリできるようにするConstruct
 */
export class FirehoseS3Athena extends Construct {
  public readonly bucket: Bucket;
  public readonly firehoseRole: Role;
  public readonly delivery: CfnDeliveryStream;
  public readonly database: Database;
  public readonly table: Table;

  constructor(scope: Construct, id: string, props: IFirehoseS3Athena) {
    super(scope, id);

    this.bucket = new Bucket(this, 'Bucket', {
      bucketName: props.bucketName,
    });

    this.firehoseRole = new Role(this, 'Role', {
      roleName: props.roleName,
      assumedBy: new ServicePrincipal('firehose.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'),
      ],
    });

    this.delivery = new CfnDeliveryStream(this, 'Delivery', {
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
    });

    this.database = new Database(this, 'Database', {
      databaseName: props.databaseName,
    });

    this.table = new Table(this, 'Table', {
      database: this.database,
      tableName: props.tableName,
      columns: props.columns,
      dataFormat: DataFormat.JSON,
      bucket: this.bucket,
      s3Prefix: props.prefix,
    });
  }
}
