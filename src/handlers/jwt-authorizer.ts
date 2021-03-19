import { promisify } from 'util';
import {
  decode,
  TokenExpiredError,
  verify,
} from 'jsonwebtoken';

import { JwksClient, CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import {
  ExpiredAuthTokenApiGwError,
  InvalidAuthTokenApiGwError,
  UnauthorizedApiGwError,
} from './jwt-authorizer-error';

export type ValidToken = {
  aud: string[];
  azp: string;
  exp: number;
  gty: string;
  iat: number;
  iss: string;
  sub: string;
  scope: string;
  permissions: string[];
};

export type LambdaAuthorizerEvent = {
  type: 'TOKEN';
  methodArn: string;
  authorizationToken: string;
};

export type Statement = {
  Action: string;
  Effect: string;
  Resource: string;
};

export type LambdaAuthorizerResponse = {
  principalId: string;
  policyDocument: {
    Version: string;
    Statement: Statement[];
  };
  context: any;
};

// OIDC
const jwksUrl = process.env.JWKS_URL!;
const audience = process.env.AUDIENCE!;
const issuer = process.env.ISSUER!;

/**
 * Lambda AuthorizerのEventからTokenを取得する
 * @param event
 */
const getToken = (event: LambdaAuthorizerEvent): string => {
  const tokenString = event.authorizationToken;
  if (!tokenString) {
    throw new UnauthorizedApiGwError();
  }
  const match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new UnauthorizedApiGwError();
  }
  return match[1];
};

/**
 * API Gatewayのexecuteを許可するポリシーを生成する
 */
const generateAllowPolicy = (
  principalId: string,
  token: string,
): LambdaAuthorizerResponse => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*',
        },
      ],
    },
    context: {
      token,
    },
  };
};

/**
 * API Gatewayのexecuteを拒否するポリシーを生成する
 */
const generateDenyPolicy = (error: Error): LambdaAuthorizerResponse => {
  return {
    principalId: '*',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Deny',
          Resource: '*',
        },
      ],
    },
    context: {
      msg: error.message,
    },
  };
};

export async function handler(
  event: LambdaAuthorizerEvent,
): Promise<LambdaAuthorizerResponse> {
  try {
    console.info(JSON.stringify(event));
    const token = getToken(event);
    const decoded = decode(token, { complete: true });
    console.info(decoded);

    if (!decoded) {
      return generateDenyPolicy(
        new InvalidAuthTokenApiGwError(new Error('invalid token')),
      );
    }

    const client = new JwksClient({ jwksUri: jwksUrl });
    const getSigningKey = promisify(client.getSigningKey);
    const key = await getSigningKey(decoded.header.kid);
    const publicKey =
            (key as CertSigningKey).publicKey ||
            (key as RsaSigningKey).rsaPublicKey;
    const res = await verify(token, publicKey as string, {
      audience,
      issuer,
    }) as ValidToken;

    return generateAllowPolicy(
      res!.sub,
      token,
    );
  } catch (e) {
    console.error(e);
    if (e instanceof TokenExpiredError) {
      return generateDenyPolicy(
        new ExpiredAuthTokenApiGwError(e),
      );
    }
    throw e;
  }
}
