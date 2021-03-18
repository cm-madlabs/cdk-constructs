# API Reference

**Classes**

Name|Description
----|-----------
[AmplifyConsoleCiCd](#cm-madlabs-cdk-constructs-amplifyconsolecicd)|Amplify ConsoleのCICDを作成するConstruct ReactなどのSPAをホスティングするために利用する.
[BucketReplicationIamRole](#cm-madlabs-cdk-constructs-bucketreplicationiamrole)|バケットレプリケーションを行うために、レプリケーション元に設定するIAMロールを作成するConstruct.
[FirehoseS3Athena](#cm-madlabs-cdk-constructs-firehoses3athena)|Kinesis Firehose経由でS3に保存してAthenaでクエリできるようにするConstruct.
[ReplicationDestinationBucket](#cm-madlabs-cdk-constructs-replicationdestinationbucket)|レプリケーション先となるS3バケットを作成するConstruct.


**Interfaces**

Name|Description
----|-----------
[IAmplifyConsoleForSpaProps](#cm-madlabs-cdk-constructs-iamplifyconsoleforspaprops)|*No description*
[IFirehoseS3Athena](#cm-madlabs-cdk-constructs-ifirehoses3athena)|*No description*
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



## class BucketReplicationIamRole  <a id="cm-madlabs-cdk-constructs-bucketreplicationiamrole"></a>

バケットレプリケーションを行うために、レプリケーション元に設定するIAMロールを作成するConstruct.

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

Kinesis Firehose経由でS3に保存してAthenaでクエリできるようにするConstruct.

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



## class ReplicationDestinationBucket  <a id="cm-madlabs-cdk-constructs-replicationdestinationbucket"></a>

レプリケーション先となるS3バケットを作成するConstruct.

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
**columns** | <code>Array<[Column](#aws-cdk-aws-glue-column)></code> | Athenaでクエリするためのテーブルカラム.
**databaseName** | <code>string</code> | Glueデータベース名.
**prefix** | <code>string</code> | Athenaでクエリする対象となるS3バケットのパスprefix.
**roleName** | <code>string</code> | IAMロール名.
**tableName** | <code>string</code> | Glueテーブル名.
**bucketName**? | <code>string</code> | バケット名.<br/>__*Optional*__
**deliveryStreamName**? | <code>string</code> | Firehose Delivery Stream名.<br/>__*Optional*__



## interface IReplicationDestinationBucket  <a id="cm-madlabs-cdk-constructs-ireplicationdestinationbucket"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseIamRoleArn** | <code>string</code> | レプリケーション元の IAM Role Arn.
**bucketName**? | <code>string</code> | バケット名.<br/>__*Optional*__



## interface IS3BucketReplicationIamRoleProps  <a id="cm-madlabs-cdk-constructs-is3bucketreplicationiamroleprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**baseBucketArn** | <code>string</code> | レプリケーション元のS3バケットArn.
**sourceBucketArn** | <code>string</code> | レプリケーション先のS3バケットArn.
**roleName**? | <code>string</code> | IAM Role名.<br/>__*Optional*__



