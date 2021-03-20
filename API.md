# API Reference

**Classes**

Name|Description
----|-----------
[AmplifyConsoleCiCd](#cm-madlabs-cdk-constructs-amplifyconsolecicd)|*No description*
[ApiGatewayUtil](#cm-madlabs-cdk-constructs-apigatewayutil)|*No description*
[FirehoseS3Athena](#cm-madlabs-cdk-constructs-firehoses3athena)|*No description*
[JwtAuthorizer](#cm-madlabs-cdk-constructs-jwtauthorizer)|*No description*
[ReplicationDestinationBucket](#cm-madlabs-cdk-constructs-replicationdestinationbucket)|*No description*
[S3BucketReplicationIamRole](#cm-madlabs-cdk-constructs-s3bucketreplicationiamrole)|*No description*


**Interfaces**

Name|Description
----|-----------
[IAmplifyConsoleForSpaProps](#cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops)|*No description*
[IFirehoseS3Athena](#cm-madlabs-cdk-constructs-ifirehoses3athena)|*No description*
[IJwtAuthorizer](#cm-madlabs-cdk-constructs-ijwtauthorizer)|*No description*
[IReplicationDestinationBucket](#cm-madlabs-cdk-constructs-ireplicationdestinationbucket)|*No description*
[IS3BucketReplicationIamRoleProps](#cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops)|*No description*



## class AmplifyConsoleCiCd  <a id="cm-madlabs-cdk-constructs-amplifyconsolecicd"></a>



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




### Initializer




```ts
new ApiGatewayUtil()
```



### Methods


#### *static* addQueryGetMethod(resource, fn) <a id="cm-madlabs-cdk-constructs-apigatewayutil-addquerygetmethod"></a>

querystring で複数件取得する GET Method を作成する ex GET /users?name=xxx&limit=10&next_token=xxx.

```ts
static addQueryGetMethod(resource: Resource, fn: IFunction): Method
```

* **resource** (<code>[Resource](#aws-cdk-aws-apigateway-resource)</code>)  *No description*
* **fn** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description*

__Returns__:
* <code>[Method](#aws-cdk-aws-apigateway-method)</code>

#### *static* addSingleGetMethod(resource, fn) <a id="cm-madlabs-cdk-constructs-apigatewayutil-addsinglegetmethod"></a>

REST 1件取得する GET Method を作成する ex GET /users/{id}.

```ts
static addSingleGetMethod(resource: Resource, fn: IFunction): Method
```

* **resource** (<code>[Resource](#aws-cdk-aws-apigateway-resource)</code>)  *No description*
* **fn** (<code>[IFunction](#aws-cdk-aws-lambda-ifunction)</code>)  *No description*

__Returns__:
* <code>[Method](#aws-cdk-aws-apigateway-method)</code>



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



## class S3BucketReplicationIamRole  <a id="cm-madlabs-cdk-constructs-s3bucketreplicationiamrole"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new S3BucketReplicationIamRole(scope: Construct, id: string, props: IS3BucketReplicationIamRoleProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[IS3BucketReplicationIamRoleProps](#cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**role** | <code>[Role](#aws-cdk-aws-iam-role)</code> | <span></span>



## interface IAmplifyConsoleForSpaProps  <a id="cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops"></a>




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



