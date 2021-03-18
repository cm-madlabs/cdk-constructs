import * as cdk from '@aws-cdk/core';

export interface CdkConstructsProps {
  // Define construct properties here
}

export class CdkConstructs extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: CdkConstructsProps = {}) {
    super(scope, id);

    // Define construct contents here
  }
}
