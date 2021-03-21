import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { ReplicationDestinationBucket } from '../src';

describe('ReplicationDestinationBucket', () => {
  test('default', () => {
    const stack = new cdk.Stack();

    new ReplicationDestinationBucket(stack, 'test', {
      bucketName: 'test',
      baseIamRoleArn: 'test',
      destinationRoleArn: 'test',
    });

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});