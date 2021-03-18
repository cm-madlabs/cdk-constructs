import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface S3BucketReplicationIamRoleProps {
  roleName: string;
  baseBucketArn: string;
  sourceBucketArn: string;
}

export class S3BucketReplicationIamRole extends cdk.Construct {
  public replicationRole: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: S3BucketReplicationIamRoleProps) {
    super(scope, id);

    this.replicationRole = new iam.Role(this, id, {
      roleName: props.roleName,
      assumedBy: new iam.ServicePrincipal('s3.amazonaws.com'),
      inlinePolicies: {
        couponServicePolicy: new iam.PolicyDocument({
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