# API Reference

**Classes**

Name|Description
----|-----------
[AmplifyConsoleCiCd](#cm-madlabs-cdk-constructs-amplifyconsolecicd)|Amplify ConsoleのCICDを作成するConstruct ReactなどのSPAをホスティングするために利用する.
[ApiGatewayUtil](#cm-madlabs-cdk-constructs-apigatewayutil)|CDKでAPI Gatewayを定義するために、汎用的に使えるUtil関数.
[BucketReplicationIamRole](#cm-madlabs-cdk-constructs-bucketreplicationiamrole)|*No description*
[FirehoseS3Athena](#cm-madlabs-cdk-constructs-firehoses3athena)|*No description*
[JwtAuthorizer](#cm-madlabs-cdk-constructs-jwtauthorizer)|*No description*
[ReplicationDestinationBucket](#cm-madlabs-cdk-constructs-replicationdestinationbucket)|*No description*


**Interfaces**

Name|Description
----|-----------
[IAmplifyConsoleForSpaProps](#cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops)|*No description*
[IFirehoseS3Athena](#cm-madlabs-cdk-constructs-ifirehoses3athena)|*No description*
[IJwtAuthorizer](#cm-madlabs-cdk-constructs-ijwtauthorizer)|*No description*
[IReplicationDestinationBucket](#cm-madlabs-cdk-constructs-ireplicationdestinationbucket)|*No description*
[IS3BucketReplicationIamRoleProps](#cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops)|*No description*



## class AmplifyConsoleCiCd  <a id="cm-madlabs-cdk-constructs-amplifyconsolecicd"></a>

Amplify ConsoleのCICDを作成するConstruct ReactなどのSPAをホスティングするために利用する.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new AmplifyConsoleCiCd(scope: Construct, id: string, props: IAmplifyConsoleForSpaProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IAmplifyConsoleForSpaProps](#cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**amplify** | <code>[App](#aws-cdk-aws-amplify-app)</code> | <span></span>



## class ApiGatewayUtil  <a id="cm-madlabs-cdk-constructs-apigatewayutil"></a>

CDKでAPI Gatewayを定義するために、汎用的に使えるUtil関数.


### Initializer




```ts
new ApiGatewayUtil()
```



### Methods


#### *static* commonMethodIntegrationResponse(defaultResponse) <a id="cm-madlabs-cdk-constructs-apigatewayutil-commonmethodintegrationresponse"></a>

API Gatewayの統合レスポンス.

```ts
static commonMethodIntegrationResponse(defaultResponse: IntegrationResponse): Array<IntegrationResponse>
```

* **defaultResponse** (<code>[IntegrationResponse](#aws-cdk-aws-apigateway-integrationresponse)</code>)  *No description*
  * **statusCode** (<code>string</code>)  The status code that API Gateway uses to map the integration response to a MethodResponse status code. 
  * **contentHandling** (<code>[ContentHandling](#aws-cdk-aws-apigateway-contenthandling)</code>)  Specifies how to handle request payload content type conversions. __*Default*__: none the request payload is passed through from the method request to the integration request without modification.
  * **responseParameters** (<code>Map<string, string></code>)  The response parameters from the backend response that API Gateway sends to the method response. __*Optional*__
  * **responseTemplates** (<code>Map<string, string></code>)  The templates that are used to transform the integration response body. __*Optional*__
  * **selectionPattern** (<code>string</code>)  Specifies the regular expression (regex) pattern used to choose an integration response based on the response from the back end. __*Optional*__

__Returns__:
* <code>Array<[IntegrationResponse](#aws-cdk-aws-apigateway-integrationresponse)></code>

#### *static* commonMethodOptionsResponse() <a id="cm-madlabs-cdk-constructs-apigatewayutil-commonmethodoptionsresponse"></a>

API Gatewayのメソッドレスポンスを定義.

```ts
static commonMethodOptionsResponse(): Array<MethodResponse>
```


__Returns__:
* <code>Array<[MethodResponse](#aws-cdk-aws-apigateway-methodresponse)></code>

#### *static* corsHeaderIntegration() <a id="cm-madlabs-cdk-constructs-apigatewayutil-corsheaderintegration"></a>

API Gatewayの統合のCORSレスポンスヘッダーを返却する.

```ts
static corsHeaderIntegration(): Map<string, string>
```


__Returns__:
* <code>Map<string, string></code>

#### *static* corsResponseHeader() <a id="cm-madlabs-cdk-constructs-apigatewayutil-corsresponseheader"></a>

API GatewayのCORSレスポンスヘッダーを返却する.

```ts
static corsResponseHeader(): Map<string, boolean>
```


__Returns__:
* <code>Map<string, boolean></code>

#### *static* createQueryGetMethod(resource, fn) <a id="cm-madlabs-cdk-constructs-apigatewayutil-createquerygetmethod"></a>

Querystring で複数リソースを取得する GET メソッドを作成する ex GET /users?name=xxx&limit=10&next_token=xxx.

```ts
static createQueryGetMethod(resource: Resource, fn: IFunction): Method
```

* **resource** (<code>[Resource](#aws-cdk-aws-apigateway-resource)</code>)  *No description*
* **fn** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description*

__Returns__:
* <code>[Method](#aws-cdk-aws-apigateway-method)</code>

#### *static* createRestSingleGetMethod(resource, fn) <a id="cm-madlabs-cdk-constructs-apigatewayutil-createrestsinglegetmethod"></a>

REST 単一リソースを取得する GET メソッドを作成する ex GET /users/{id}.

```ts
static createRestSingleGetMethod(resource: Resource, fn: IFunction): Method
```

* **resource** (<code>[Resource](#aws-cdk-aws-apigateway-resource)</code>)  *No description*
* **fn** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description*

__Returns__:
* <code>[Method](#aws-cdk-aws-apigateway-method)</code>



## class BucketReplicationIamRole  <a id="cm-madlabs-cdk-constructs-bucketreplicationiamrole"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BucketReplicationIamRole(scope: Construct, id: string, props: IS3BucketReplicationIamRoleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IS3BucketReplicationIamRoleProps](#cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**role** | <code>[Role](#aws-cdk-aws-iam-role)</code> | <span></span>



## class FirehoseS3Athena  <a id="cm-madlabs-cdk-constructs-firehoses3athena"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new FirehoseS3Athena(scope: Construct, id: string, props: IFirehoseS3Athena)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IFirehoseS3Athena](#cm-madlabs-cdk-constructs-ifirehoses3athena)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**bucket** | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | <span></span>
**database** | <code>[Database](#aws-cdk-aws-glue-database)</code> | <span></span>
**delivery** | <code>[CfnDeliveryStream](#aws-cdk-aws-kinesisfirehose-cfndeliverystream)</code> | <span></span>
**firehoseRole** | <code>[Role](#aws-cdk-aws-iam-role)</code> | <span></span>
**table** | <code>[Table](#aws-cdk-aws-glue-table)</code> | <span></span>



## class JwtAuthorizer  <a id="cm-madlabs-cdk-constructs-jwtauthorizer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new JwtAuthorizer(scope: Construct, id: string, props: IJwtAuthorizer)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IJwtAuthorizer](#cm-madlabs-cdk-constructs-ijwtauthorizer)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**authorizer** | <code>[Function](#aws-cdk-aws-lambda-function)</code> | <span></span>



## class ReplicationDestinationBucket  <a id="cm-madlabs-cdk-constructs-replicationdestinationbucket"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ReplicationDestinationBucket(scope: Construct, id: string, props: IReplicationDestinationBucket)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IReplicationDestinationBucket](#cm-madlabs-cdk-constructs-ireplicationdestinationbucket)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**bucket** | <code>[Bucket](#aws-cdk-aws-s3-bucket)</code> | <span></span>



## interface IAmplifyConsoleForSpaProps  <a id="cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseDirectory** | <code>string</code> | artifactのbaseDirectory（デプロイ対象のフォルダ）.
**buildCommands** | <code>Array<string></code> | Build.
**githubOwner** | <code>string</code> | GitHubのオーナー.
**githubRepo** | <code>string</code> | GitHubのリポジトリ.
**githubTokenSecretId** | <code>string</code> | GitHubの Personal AccessToken を格納している SecretManager の SecretId.
**isAutoBuild** | <code>boolean</code> | 自動的にビルドするかどうか.
**isBasicAuth** | <code>boolean</code> | BASIC認証を行うかどうか.
**postBuildCommands** | <code>Array<string></code> | PostBuild.
**preBuildCommands** | <code>Array<string></code> | PreBuild.
**amplifyAppName**? | <code>string</code> | Amplify Consoleのアプリ名.<br/>__*Optional*__
**basicAuthSecretId**? | <code>string</code> | BASIC認証を行う場合のパスワード格納している SecretManager の SecretId.<br/>__*Optional*__
**basicAuthUserName**? | <code>string</code> | BASIC認証を行う場合のユーザー名.<br/>__*Optional*__



## interface IFirehoseS3Athena  <a id="cm-madlabs-cdk-constructs-ifirehoses3athena"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**bucketName** | <code>string</code> | <span></span>
**columns** | <code>Array<[Column](#aws-cdk-aws-glue-column)></code> | <span></span>
**databaseName** | <code>string</code> | <span></span>
**deliveryStreamName** | <code>string</code> | <span></span>
**prefix** | <code>string</code> | <span></span>
**roleName** | <code>string</code> | <span></span>
**tableName** | <code>string</code> | <span></span>



## interface IJwtAuthorizer  <a id="cm-madlabs-cdk-constructs-ijwtauthorizer"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**audience** | <code>string</code> | <span></span>
**functionName** | <code>string</code> | <span></span>
**issuer** | <code>string</code> | <span></span>
**jwksUrl** | <code>string</code> | <span></span>



## interface IReplicationDestinationBucket  <a id="cm-madlabs-cdk-constructs-ireplicationdestinationbucket"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseIamRoleArn** | <code>string</code> | <span></span>
**bucketName** | <code>string</code> | <span></span>
**destinationRoleArn** | <code>string</code> | <span></span>



## interface IS3BucketReplicationIamRoleProps  <a id="cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseBucketArn** | <code>string</code> | <span></span>
**roleName** | <code>string</code> | <span></span>
**sourceBucketArn** | <code>string</code> | <span></span>



