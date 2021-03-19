# API Reference

**Classes**

Name|Description
----|-----------
[AmplifyConsoleForSpa](#cdk-constructs-amplifyconsoleforspa)|*No description*
[ApiGatewayRestApi](#cdk-constructs-apigatewayrestapi)|*No description*
[JwtAuthorizer](#cdk-constructs-jwtauthorizer)|*No description*
[S3BucketReplicationIamRole](#cdk-constructs-s3bucketreplicationiamrole)|*No description*


**Interfaces**

Name|Description
----|-----------
[IAmplifyConsoleForSpaProps](#cdk-constructs-iamplifyconsoleforspaprops)|*No description*
[IApiGatewayRestApiProps](#cdk-constructs-iapigatewayrestapiprops)|*No description*
[IJwtAuthorizer](#cdk-constructs-ijwtauthorizer)|*No description*
[IS3BucketReplicationIamRoleProps](#cdk-constructs-is3bucketreplicationiamroleprops)|*No description*



## class AmplifyConsoleForSpa  <a id="cdk-constructs-amplifyconsoleforspa"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new AmplifyConsoleForSpa(scope: Construct, id: string, props: IAmplifyConsoleForSpaProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IAmplifyConsoleForSpaProps](#cdk-constructs-iamplifyconsoleforspaprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**amplify** | <code>[App](#aws-cdk-aws-amplify-app)</code> | <span></span>



## class ApiGatewayRestApi  <a id="cdk-constructs-apigatewayrestapi"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ApiGatewayRestApi(scope: Construct, id: string, props: IApiGatewayRestApiProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IApiGatewayRestApiProps](#cdk-constructs-iapigatewayrestapiprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**api** | <code>[RestApi](#aws-cdk-aws-apigateway-restapi)</code> | <span></span>



## class JwtAuthorizer  <a id="cdk-constructs-jwtauthorizer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new JwtAuthorizer(scope: Construct, id: string, props: IJwtAuthorizer)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IJwtAuthorizer](#cdk-constructs-ijwtauthorizer)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**authorizer** | <code>[Function](#aws-cdk-aws-lambda-function)</code> | <span></span>



## class S3BucketReplicationIamRole  <a id="cdk-constructs-s3bucketreplicationiamrole"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new S3BucketReplicationIamRole(scope: Construct, id: string, props: IS3BucketReplicationIamRoleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IS3BucketReplicationIamRoleProps](#cdk-constructs-is3bucketreplicationiamroleprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**replicationRole** | <code>[Role](#aws-cdk-aws-iam-role)</code> | <span></span>



## interface IAmplifyConsoleForSpaProps  <a id="cdk-constructs-iamplifyconsoleforspaprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**amplifyAppName** | <code>string</code> | <span></span>
**baseDirectory** | <code>string</code> | <span></span>
**basicAuthSecretId** | <code>string</code> | <span></span>
**basicAuthUserName** | <code>string</code> | <span></span>
**buildCommands** | <code>Array<string></code> | <span></span>
**githubOwner** | <code>string</code> | <span></span>
**githubRepo** | <code>string</code> | <span></span>
**githubTokenSecretId** | <code>string</code> | <span></span>
**isAutoBuild** | <code>boolean</code> | <span></span>
**isBasicAuth** | <code>boolean</code> | <span></span>
**preBuildCommands** | <code>Array<string></code> | <span></span>



## interface IApiGatewayRestApiProps  <a id="cdk-constructs-iapigatewayrestapiprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**apiName** | <code>string</code> | <span></span>



## interface IJwtAuthorizer  <a id="cdk-constructs-ijwtauthorizer"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**audience** | <code>string</code> | <span></span>
**functionName** | <code>string</code> | <span></span>
**issuer** | <code>string</code> | <span></span>
**jwksUrl** | <code>string</code> | <span></span>



## interface IS3BucketReplicationIamRoleProps  <a id="cdk-constructs-is3bucketreplicationiamroleprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseBucketArn** | <code>string</code> | <span></span>
**roleName** | <code>string</code> | <span></span>
**sourceBucketArn** | <code>string</code> | <span></span>



