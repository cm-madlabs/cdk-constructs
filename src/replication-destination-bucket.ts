import { ArnPrincipal, Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import * as s3 from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';

export interface IReplicationDestinationBucket {
  /**
   * バケット名
   */
  bucketName?: string;

  /**
   * レプリケーション元の IAM Role Arn
   */
  baseIamRoleArn: string;
}

/**
 * レプリケーション先となるS3バケットを作成するConstruct
 */
export class ReplicationDestinationBucket extends cdk.Construct {
  public readonly bucket: s3.Bucket;
  constructor(scope: cdk.Construct, id: string, props: IReplicationDestinationBucket) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: props.bucketName,
      versioned: true,
    });

    this.bucket.addToResourcePolicy(
      new PolicyStatement({
        sid: '1',
        effect: Effect.ALLOW,
        principals: [new ArnPrincipal(props.baseIamRoleArn)],
        actions: [
          's3:ReplicateObject',
          's3:ReplicateDelete',
          's3:ReplicateTags',
          's3:ObjectOwnerOverrideToBucketOwner',
          's3:GetObjectVersionTagging',
        ],
        resources: [`${this.bucket.bucketArn}/*`],
      }),
    );
    this.bucket.addToResourcePolicy(
      new PolicyStatement({
        sid: '2',
        effect: Effect.ALLOW,
        principals: [new ArnPrincipal(props.baseIamRoleArn)],
        actions: ['s3:GetBucketVersioning', 's3:PutBucketVersioning'],
        resources: [`${this.bucket.bucketArn}`],
      }),
    );
  }
}
