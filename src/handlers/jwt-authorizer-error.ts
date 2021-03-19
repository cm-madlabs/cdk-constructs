import { TokenExpiredError } from 'jsonwebtoken';

export type ErrorBody = {
  status: number;
  code: string;
  message: string;
};

export abstract class AuthorizerApiGwError extends Error {
  protected constructor(body: ErrorBody) {
    super(JSON.stringify(body));
  }
}

/**
 * ErrorBody のキー順を保証するためにメソッドで定義して作成します。API Gateway のエラーマッピングが、文字列マッピングとなるためです。
 * @param status ステータスコード
 * @param code アプリケーションエラーコード
 * @param message メッセージ
 */
export function errorBody(
  status: number,
  code: string,
  message: string,
): ErrorBody {
  return {
    status,
    code,
    message,
  };
}

/**
 * トークンは抽出できたが、期限が過ぎている
 */
export class ExpiredAuthTokenApiGwError extends AuthorizerApiGwError {
  public constructor(error: TokenExpiredError) {
    super(
      errorBody(
        403,
        '40300',
        `expired date: ${error.expiredAt.toTimeString()}`,
      ),
    );
  }
}

/**
 * トークンが抽出できない、抽出できたが内容が不正など。
 * 攻撃者に情報を与えすぎないよう、期限切れ以外はこのエラーにまとめる。
 */
export class InvalidAuthTokenApiGwError extends AuthorizerApiGwError {
  public constructor(error: Error) {
    super(errorBody(403, '40301', error.message));
  }
}

/**
 * API Gateway に 401であることを伝えるためには、メッセージボディが"Unauthorized"である必要がある。
 */
export class UnauthorizedApiGwError extends Error {
  public constructor() {
    super('Unauthorized');
  }
}
