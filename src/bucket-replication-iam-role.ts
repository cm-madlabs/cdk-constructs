import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface IS3BucketReplicationIamRoleProps {
  /**
   * IAM Role名
   */
  readonly roleName?: string;

  /**
   * レプリケーション元のS3バケットArn
   */
  readonly baseBucketArn: string;

  /**
   * レプリケーション先のS3バケットArn
   */
  readonly sourceBucketArn: string;
}

/**
 * バケットレプリケーションを行うために、レプリケーション元に設定するIAMロールを作成するConstruct
 */
export class BucketReplicationIamRole extends cdk.Construct {
  public readonly role: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: IS3BucketReplicationIamRoleProps) {
    super(scope, id);

    this.role = new iam.Role(this, 'Role', {
      roleName: props.roleName,
      assumedBy: new iam.ServicePrincipal('s3.amazonaws.com'),
      inlinePolicies: {
        bucketReplicationPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:ListBucket',
                's3:GetReplicationConfiguration',
                's3:GetObjectVersionForReplication',
                's3:GetObjectVersionAcl',
                's3:GetObjectVersionTagging',
                's3:GetObjectRetention',
                's3:GetObjectLegalHold',
              ],
              resources: [
                `${props.baseBucketArn}`,
                `${props.baseBucketArn}/*`,
                `${props.sourceBucketArn}`,
                `${props.sourceBucketArn}/*`,
              ],
            }),

            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: [
                's3:ReplicateObject',
                's3:ReplicateDelete',
                's3:ReplicateTags',
                's3:ObjectOwnerOverrideToBucketOwner',
              ],
              resources: [
                `${props.baseBucketArn}/*`,
                `${props.sourceBucketArn}/*`,
              ],
            }),
          ],
        }),
      },
    });
  }
}
