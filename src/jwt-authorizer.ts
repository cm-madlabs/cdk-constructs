import * as path from 'path';
import { Runtime, Function } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';

export interface IJwtAuthorizer {
  readonly functionName: string;
  readonly jwksUrl: string;
  readonly audience: string;
  readonly issuer: string;
}

export class JwtAuthorizer extends cdk.Construct {
  public readonly authorizer: Function;

  constructor(scope: cdk.Construct, id: string, props: IJwtAuthorizer) {
    super(scope, id);

    console.log(path.join(process.cwd(), 'src/handlers/jwt-authorizer.ts'));
    this.authorizer = new NodejsFunction(this, id, {
      entry: path.join(process.cwd(), 'src/handlers/jwt-authorizer.ts'),
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