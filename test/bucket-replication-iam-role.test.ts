import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { BucketReplicationIamRole } from '../src';

describe('S3BucketReplicationIamRole', () => {
  test('default', () => {
    const stack = new cdk.Stack();
    new BucketReplicationIamRole(stack, 'test', {
      roleName: 'test-role-name',
      baseBucketArn: 'test-base-role',
      sourceBucketArn: 'test-source-role',
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});