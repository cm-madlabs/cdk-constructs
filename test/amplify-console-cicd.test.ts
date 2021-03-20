import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { AmplifyConsoleCiCd } from '../src/amplify-console-cicd';

describe('AmplifyConsoleHosting', () => {
  test('default', () => {
    const stack = new cdk.Stack();
    new AmplifyConsoleCiCd(stack, 'hosting', {
      amplifyAppName: 'test-app',
      isBasicAuth: true,
      basicAuthSecretId: 'test-secret-id',
      basicAuthUserName: 'test-user-name',
      githubTokenSecretId: 'test-secret-id',
      githubRepo: 'test-repo',
      githubOwner: 'test-owner',
      isAutoBuild: true,
      preBuildCommands: ['env'],
      buildCommands: ['env'],
      baseDirectory: './',
    });
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});