import {
    decode,
    JsonWebTokenError,
    TokenExpiredError,
    verify,
} from 'jsonwebtoken';
import {
    ExpiredAuthTokenApiGwError,
    InvalidAuthHeaderError,
    InvalidAuthHeaderNotFoundError,
    InvalidAuthTokenApiGwError,
    UnauthorizedApiGwError, VerifyTokenError,
} from './jwt-authorizer-error';

import * as jwksClient from 'jwks-rsa';
import { CertSigningKey, RsaSigningKey } from 'jwks-rsa';
import { promisify } from 'util';

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

export type OidcInfo = {
    jwksUrl: string;
    audience: string;
    issuer: string;
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

const getToken = (event: LambdaAuthorizerEvent): string => {
    const tokenString = event.authorizationToken;
    if (!tokenString) {
        throw new InvalidAuthHeaderNotFoundError();
    }
    const match = tokenString.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
        throw new InvalidAuthHeaderError(tokenString);
    }
    return match[1];
};

const info: OidcInfo = JSON.parse(process.env.oidcInfo!);
const jwksUrl = info.jwksUrl;

const generateAllowPolicy = (
    principalId: string,
    token: string,
    organizationId: string,
): LambdaAuthorizerResponse => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: 'Allow',
                    Resource: `*`,
                },
            ],
        },
        context: {
            token,
            organizationId,
        },
    };
};

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
            throw new JsonWebTokenError('invalid token');
        }

        const client = jwksClient({ jwksUri: jwksUrl });
        const getSigningKey = promisify(client.getSigningKey);
        const key = await getSigningKey(decoded.header.kid);
        const publicKey =
            (key as CertSigningKey).publicKey ||
            (key as RsaSigningKey).rsaPublicKey;
        const res = await verify(token, publicKey as string, {
            audience: info.audience,
            issuer: info.issuer,
        });
        if (typeof res === 'string') {
            throw new VerifyTokenError(token, new Error('token verify error'));
        }

        const allowPolicy = generateAllowPolicy(
            res!.sub,
            token,
            res!['https://www.softbankgift.co.jp/organizationId'],
        );
        console.info(JSON.stringify(allowPolicy));
        return allowPolicy;
    } catch (e) {
        console.error(e);
        if (
            e instanceof InvalidAuthHeaderNotFoundError ||
            e instanceof InvalidAuthHeaderError
        ) {
            throw new UnauthorizedApiGwError();
        } else if (e instanceof TokenExpiredError) {
            const denyPolicy = generateDenyPolicy(
                new ExpiredAuthTokenApiGwError(e),
            );
            console.info(JSON.stringify(denyPolicy));
            return denyPolicy;
        } else if (
            e instanceof JsonWebTokenError ||
            e instanceof VerifyTokenError
        ) {
            const denyPolicy = generateDenyPolicy(
                new InvalidAuthTokenApiGwError(e),
            );
            console.info(JSON.stringify(denyPolicy));
            return denyPolicy;
        }
        throw e;
    }
}
