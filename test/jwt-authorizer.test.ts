import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { JwtAuthorizer } from '../src';

describe('JwtAuthorizer', () => {
  test('default', () => {
    const stack = new cdk.Stack();
    new JwtAuthorizer(stack, 'jwt', {
      functionName: 'test',
      jwksUrl: 'test-url',
      audience: 'test-audience',
      issuer: 'test-issuer',
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});