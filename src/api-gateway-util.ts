import {
  IntegrationResponse,
  MethodResponse,
  ConnectionType,
  LambdaIntegration,
  AuthorizationType,
  PassthroughBehavior,
  Resource, Method,
} from '@aws-cdk/aws-apigateway';
import { IFunction } from '@aws-cdk/aws-lambda';

/**
 * CDKでAPI Gatewayを定義するために、汎用的に使えるUtil関数
 */
export class ApiGatewayUtil {
  /**
   * REST 単一リソースを取得する GET メソッドを作成する
   * ex GET /users/{id}
   * @param resource
   * @param fn
   */
  public static createRestSingleGetMethod(resource: Resource, fn: IFunction): Method {
    const integration = new LambdaIntegration(
      fn,
      {
        proxy: false,
        connectionType: ConnectionType.INTERNET,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
        requestTemplates: {
          'application/json': JSON.stringify({
            id: "$input.params('id')",
          }),
        },
        integrationResponses: ApiGatewayUtil.commonMethodIntegrationResponse({
          statusCode: '200',
          responseParameters: ApiGatewayUtil.corsHeaderIntegration(),
          responseTemplates: {
            'application/json': '$input.json(\'$\')',
          },
        }),
      },
    );
    return resource.addMethod('GET', integration, {
      authorizationType: AuthorizationType.CUSTOM,
      requestParameters: {
        'method.request.path.id': true,
      },
      methodResponses: ApiGatewayUtil.commonMethodOptionsResponse(),
    });
  }

  /**
   * Querystring で複数リソースを取得する GET メソッドを作成する
   * ex GET /users?name=xxx&limit=10&next_token=xxx
   * @param resource
   * @param fn
   */
  public static createQueryGetMethod(resource: Resource, fn: IFunction): Method {
    const integration = new LambdaIntegration(
      fn,
      {
        proxy: false,
        connectionType: ConnectionType.INTERNET,
        passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
        requestTemplates: {
          'application/json': `
                    #set($allParams = $input.params())
                    {
                        "body": {
                            #foreach($type in $allParams.keySet())
                                #if($type == "querystring")
                                    #set($params = $allParams.get($type))
                                    #foreach($paramName in $params.keySet())
                                        "$paramName" : "$util.escapeJavaScript($params.get($paramName))"
                                        #if($foreach.hasNext)
                                            ,
                                        #end
                                    #end
                                #end
                            #end
                        }
                    }
              `,
        },
        integrationResponses: ApiGatewayUtil.commonMethodIntegrationResponse({
          statusCode: '200',
          responseParameters: ApiGatewayUtil.corsHeaderIntegration(),
          responseTemplates: {
            'application/json': '$input.json(\'$\')',
          },
        }),
      },
    );
    return resource.addMethod('GET', integration, {
      methodResponses: ApiGatewayUtil.commonMethodOptionsResponse(),
    });
  }

  /**
   * API GatewayのCORSレスポンスヘッダーを返却する
   */
  public static corsResponseHeader(): { [destination: string]: boolean } {
    return {
      'method.response.header.Access-Control-Allow-Headers': true,
      'method.response.header.Access-Control-Allow-Methods': true,
      'method.response.header.Access-Control-Allow-Origin': true,
    };
  }

  /**
   * API Gatewayの統合のCORSレスポンスヘッダーを返却する
   */
  public static corsHeaderIntegration(): { [destination: string]: string } {
    return {
      'method.response.header.Access-Control-Allow-Headers':
          "'Origin,Content-Type,Authorization'",
      'method.response.header.Access-Control-Allow-Methods':
          "'GET,PUT,POST,PATCH,DELETE,OPTIONS'",
      'method.response.header.Access-Control-Allow-Origin': "'*'",
    };
  }

  /**
   * API Gatewayの統合レスポンス
   * @param defaultResponse
   */
  public static commonMethodIntegrationResponse(defaultResponse: IntegrationResponse): IntegrationResponse[] {
    return [
      defaultResponse,
      {
        statusCode: '400',
        responseParameters: this.corsHeaderIntegration(),

        responseTemplates: {
          'application/json': '$util.parseJson($input.json(\'$.errorMessage\'))',
        },
        selectionPattern: '^\\{\\"status\\":400.*',
      },
      {
        statusCode: '403',
        responseParameters: this.corsHeaderIntegration(),

        responseTemplates: {
          'application/json': '$util.parseJson($input.json(\'$.errorMessage\'))',
        },
        selectionPattern: '^\\{\\"status\\":403.*',
      },
      {
        statusCode: '404',
        responseParameters: this.corsHeaderIntegration(),

        responseTemplates: {
          'application/json': '$util.parseJson($input.json(\'$.errorMessage\'))',
        },
        selectionPattern: '^\\{\\"status\\":404.*',
      },
      {
        statusCode: '500',
        responseParameters: this.corsHeaderIntegration(),

        responseTemplates: {
          'application/json': '$util.parseJson($input.json(\'$.errorMessage\'))',
        },
        selectionPattern: '^\\{\\"status\\":500.*',
      },
    ];
  }

  /**
   * API Gatewayのメソッドレスポンスを定義
   */
  public static commonMethodOptionsResponse(): MethodResponse[] {
    return [
      {
        statusCode: '200',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '201',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '202',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '204',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '400',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '401',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '403',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '404',
        responseParameters: this.corsResponseHeader(),
      },
      {
        statusCode: '500',
        responseParameters: this.corsResponseHeader(),
      },
    ];
  }
}
