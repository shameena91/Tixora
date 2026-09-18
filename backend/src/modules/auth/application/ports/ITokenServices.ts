import { AccountRole } from "../../domain/entities/Account";

export interface ITokenService {
  generateAccessToken(payload: {
    accountId: string;
    email: string;
       role: AccountRole;
  }): string;

  generateRefreshToken(payload: {
    accountId: string;
  }): string;

    verifyAccessToken(token: string): {
    accountId: string;
    email: string;
       role: AccountRole;
  };
    verifyRefreshToken(token: string): {
    accountId: string;
  };
}