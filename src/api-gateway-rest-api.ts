import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as logs from '@aws-cdk/aws-logs';
import * as cdk from '@aws-cdk/core';

export interface IApiGatewayRestApiProps {
  readonly apiName: string;
}

export class ApiGatewayRestApi extends cdk.Construct {
  public api: apiGateway.RestApi;

  constructor(scope: cdk.Construct, id: string, props: IApiGatewayRestApiProps) {
    super(scope, id);

    this.api = new apiGateway.RestApi(this, id, {
      restApiName: props.apiName,
      endpointConfiguration: {
        types: [apiGateway.EndpointType.REGIONAL],
      },
      deployOptions: {
        accessLogDestination: new apiGateway.LogGroupLogDestination(
          new logs.LogGroup(this, `${id}-ApiLogGroup`),
        ),
        accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields(),
        loggingLevel: apiGateway.MethodLoggingLevel.ERROR,
        metricsEnabled: true,
        stageName: 'v1',
        tracingEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
        allowCredentials: true,
      },
    });
  }
}