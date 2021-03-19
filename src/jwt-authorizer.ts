import { Runtime, Function } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';

export interface IJwtAuthorizer {
  functionName: string;
  jwksUrl: string;
  audience: string;
  issuer: string;
}

export class JwtAuthorizer extends cdk.Construct {
  public authorizer: Function;

  constructor(scope: cdk.Construct, id: string, props: IJwtAuthorizer) {
    super(scope, id);

    this.authorizer = new NodejsFunction(this, 'authorizer', {
      entry: './lib/handlers/jwt-authorizer.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_14_X,
      functionName: props.functionName,
      memorySize: 128,
      environment: {
        JWKS_URL: props.jwksUrl,
        AUDIENCE: props.audience,
        ISSUER: props.issuer,
      },
    });
  }
}