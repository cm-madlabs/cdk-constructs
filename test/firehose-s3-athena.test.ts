import {
  SynthUtils,
} from '@aws-cdk/assert';
import {
  Schema,
} from '@aws-cdk/aws-glue';
import {
  Stack,
} from '@aws-cdk/core';
import {
  FirehoseS3Athena,
} from '../src';

describe('KinesisFirehoseS3Athena', () => {
  test('default', () => {
    const stack = new
    Stack();

    new FirehoseS3Athena(stack, 'test', {
      bucketName: 'test-bucket',
      roleName: 'test-role',
      deliveryStreamName: 'test-delivery',
      databaseName: 'test-database',
      tableName: 'test-table',
      prefix: 'test/',
      columns: [{
        name: 'id',
        type: Schema.STRING,
      },
      {
        name: 'name',
        type: Schema.STRING,
      }],
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});
