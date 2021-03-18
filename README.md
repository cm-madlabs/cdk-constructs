[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Build](https://github.com/cm-madlabs/cdk-constructs/actions/workflows/build.yml/badge.svg)](https://github.com/cm-madlabs/cdk-constructs/actions/workflows/build.yml)
[![Release](https://github.com/cm-madlabs/cdk-constructs/actions/workflows/release.yml/badge.svg)](https://github.com/cm-madlabs/cdk-constructs/actions/workflows/release.yml)

# MAD Labs AWS CDK Constructs

汎用的なCDKリソース定義を`Construct`としてまとめていきます。
AWS CDKで実装する際の参考に使ってください。

## How to use

基本的な使い方は、CDKのConstructを使う手順と同様です。

### パッケージをインストールする

```shell
yarn add -D @cm-madlabs/cdk-construct
```

### CDKプロジェクトでimportして使う

```typescript
import * as cdk from '@aws-cdk/core';
import {BucketReplicationIamRole} from '@cm-madlabs/cdk-construct';

export class TestStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);
        
        // パケットレプリケーション用のIAMロールを作成するConstruct
        const replication = new BucketReplicationIamRole(this, 'test', {
            bucketName: 'test',
            baseIamRoleArn: 'test',
            destinationRoleArn: 'test',
        });
        
        console.log(replication.role);
    }
}
```

## API Reference

`Construct`をクラスとしてまとめています。クラスの仕様については、 
[API.md](https://github.com/cm-madlabs/cdk-constructs/blob/main/API.md)を参照してください。

## Steps to add Construct

新しいConstructを追加する手順です。
このプロジェクトでは、テスト的に [projen](https://github.com/projen/projen) というプロジェクトの設定を管理するOSSをを使っています。
基本的に、`package.json`,`tsconfig.json`などの設定ファイルとなる `json` ファイルを直接触ることができません。
新しいライブラリを追加したり、設定ファイルをいじる場合は、`projenrc.js`を修正します。

### 1. プロジェクトを Clone する

プロジェクトをCloneします。

```shell
git clone https://github.com/cm-madlabs/cdk-constructs.git
```

### 2. パッケージをインストールする

`projen`の制約で使っているので、`yarn install`を使ってはいけません。

```shell
yarn prohen
```

### 3. Constructを`src/`配下に作成する

Constructクラスを作成する手順です。

#### `cdk.Construct`を継承したクラスを作成します。

```typescript
import * as cdk from '@aws-cdk/core';

export class TestConstruct extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props: IS3BucketReplicationIamRoleProps) {
        super(scope, id);
        
        // 以下にConstrcutとしてまとめたいリソース定義を作成する
    }
}
```

#### `src/index.ts`に追加したConstructを追加する

```typescript
export * from './test-construct';
```

### 4. Snapshot テストを書く

生成されるCloudFormationテンプレートにに変更がないことを確認するSnapshotテストを作成します。

WIP

