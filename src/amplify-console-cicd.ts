import * as amplify from '@aws-cdk/aws-amplify';
import { BuildSpec } from '@aws-cdk/aws-codebuild';
import * as cdk from '@aws-cdk/core';

export interface IAmplifyConsoleForSpaProps {
  /**
   * Amplify Consoleのアプリ名
   */
  readonly amplifyAppName?: string;

  /**
   * BASIC認証を行うかどうか
   */
  readonly isBasicAuth: boolean;

  /**
   * BASIC認証を行う場合のパスワード格納している SecretManager の SecretId
   */
  readonly basicAuthSecretId?: string;

  /**
   * BASIC認証を行う場合のユーザー名
   */
  readonly basicAuthUserName?: string;

  /**
   * GitHubの Personal AccessToken を格納している SecretManager の SecretId
   */
  readonly githubTokenSecretId: string;

  /**
   * GitHubのオーナー
   */
  readonly githubOwner: string;

  /**
   * GitHubのリポジトリ
   */
  readonly githubRepo: string;

  /**
   * 自動的にビルドするかどうか
   */
  readonly isAutoBuild: boolean;

  /**
   * PreBuild
   */
  readonly preBuildCommands: string[];

  /**
   * Build
   */
  readonly buildCommands: string[];

  /**
   * PostBuild
   */
  readonly postBuildCommands: string[];

  /**
   * artifactのbaseDirectory（デプロイ対象のフォルダ）
   */
  readonly baseDirectory: string;
}

/**
 * Amplify ConsoleのCICDを作成するConstruct
 * ReactなどのSPAをホスティングするために利用する
 */
export class AmplifyConsoleCiCd extends cdk.Construct {
  public readonly amplify: amplify.App;

  constructor(scope: cdk.Construct, id: string, props: IAmplifyConsoleForSpaProps) {
    super(scope, id);

    this.amplify = new amplify.App(this, 'App', {
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
            postBuild: {
              commands: props.postBuildCommands,
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
        props.basicAuthUserName!,
        cdk.SecretValue.secretsManager(props.basicAuthSecretId!),
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
          source: '</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|ttf|map|json)$)([^.]+$)/>',
          target: '/index.html',
          status: amplify.RedirectStatus.REWRITE,
        },
      ],
    });
  }
}
