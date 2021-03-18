import * as amplify from '@aws-cdk/aws-amplify';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import * as cdk from '@aws-cdk/core';

type IsBasicAuth = boolean;
type BasicAuthSecretId<T> = T extends true ? string : never;
type BasicAuthUserName<T> = T extends true ? string : never;

export interface AmplifyConsoleForSpaProps {
  amplifyAppName: string;
  isBasicAuth: IsBasicAuth;
  basicAuthSecretId: BasicAuthSecretId<IsBasicAuth>;
  basicAuthUserName: BasicAuthUserName<IsBasicAuth>;
  githubTokenSecretId: string;
  githubOwner: string;
  githubRepo: string;
  isAutoBuild: boolean;
  preBuildCommands: string[];
  buildCommands: string[];
  baseDirectory: string;
}

export class AmplifyConsoleForSpa extends cdk.Construct {
  public amplify: amplify.App;

  constructor(scope: cdk.Construct, id: string, props: AmplifyConsoleForSpaProps) {
    super(scope, id);

    this.amplify = new amplify.App(this, id, {
      appName: props.amplifyAppName,
      buildSpec: BuildSpec.fromObject({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: props.preBuildCommands,
            },
            build: {
              commands: props.buildCommands,
            },
          },
          artifacts: {
            baseDirectory: props.baseDirectory,
            files: ['**/*'],
          },
          cache: { paths: ['node_modules/**/*'] },
          customHeaders: [
            {
              pattern: '**/*',
              headers: [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=31536000; includeSubDomains',
                },
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'X-XSS-Protection', value: '1; mode=block' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
              ],
            },
          ],
        },
      }),
      basicAuth: props.isBasicAuth ? amplify.BasicAuth.fromCredentials(
        props.basicAuthUserName,
        cdk.SecretValue.secretsManager(props.basicAuthSecretId),
      ): undefined,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        oauthToken: cdk.SecretValue.secretsManager(props.githubTokenSecretId),
        owner: props.githubOwner,
        repository: props.githubRepo,
      }),
      autoBranchCreation: {
        autoBuild: props.isAutoBuild,
        patterns: ['master', 'main', 'feature/deploy*'],
        pullRequestPreview: false,
      },
      customRules: [
        {
          source:
                        '</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>',
          target: '/index.html',
          status: amplify.RedirectStatus.REWRITE,
        },
      ],
    });
  }
}