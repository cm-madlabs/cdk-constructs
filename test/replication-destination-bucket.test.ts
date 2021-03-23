import {
  SynthUtils,
} from '@aws-cdk/assert';
import {
  Stack,
} from '@aws-cdk/core';
import {
  ReplicationDestinationBucket,
} from '../src';

describe('ReplicationDestinationBucket', () => {
  test('default', () => {
    const stack = new Stack();

    new ReplicationDestinationBucket(stack, 'test', {
      bucketName: 'test',
      baseIamRoleArn: 'test',
    });

    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
