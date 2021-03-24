import {
  Effect,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from '@aws-cdk/aws-iam';
import {
  Construct,
} from '@aws-cdk/core';

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
export class BucketReplicationIamRole extends Construct {
  public readonly role: Role;

  constructor(scope: Construct, id: string, props: IS3BucketReplicationIamRoleProps) {
    super(scope, id);

    this.role = new Role(this, 'Role', {
      roleName: props.roleName,
      assumedBy: new ServicePrincipal('s3.amazonaws.com'),
      inlinePolicies: {
        bucketReplicationPolicy: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
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

            new PolicyStatement({
              effect: Effect.ALLOW,
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
