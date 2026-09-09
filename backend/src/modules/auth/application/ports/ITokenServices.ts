export interface ITokenService {
  generateAccessToken(payload: {
    accountId: string;
    email: string;
  }): string;

  generateRefreshToken(payload: {
    accountId: string;
  }): string;

    verifyAccessToken(token: string): {
    accountId: string;
    email: string;
  };
    verifyRefreshToken(token: string): {
    accountId: string;
  };
}