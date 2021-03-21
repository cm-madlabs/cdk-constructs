const { AwsCdkConstructLibrary, ProjectType, NpmAccess } = require('projen');

const project = new AwsCdkConstructLibrary({
  name: '@cm-madlabs/cdk-constructs',
  author: 'classmethod',
  authorUrl: 'https://classmethod.jp/services/mad',
  cdkVersion: '1.x',
  defaultReleaseBranch: 'main',
  jsiiFqn: 'projen.AwsCdkConstructLibrary',
  repositoryUrl: 'https://github.com/cm-madlabs/cdk-constructs.git',
  description: 'AWS CDK Constructs that can be used universally by MAD teams.',
  artifactsDirectory: 'dist',
  releaseToNpm: true,
  codeCov: true,
  minNodeVersion: '10.17.0',
  projectType: ProjectType.LIB,
  npmAccess: NpmAccess.PUBLIC,
  cdkAssert: true,
  licensed: true,
  license: 'MIT',
  gitignore: ['.idea'],
  keywords: [
    'cdk',
    'cdk-constructs',
  ],
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-amplify',
    '@aws-cdk/aws-codebuild',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-apigateway',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-kinesisfirehose',
    '@aws-cdk/aws-glue',
  ],
  bundledDeps: [
    'jsonwebtoken',
    'jwks-rsa',
  ],
  devDeps: [
    '@types/jsonwebtoken',
    'esbuild',
  ],
  scripts: {},
});

project.synth();
