import { Account } from "../../domain/entities/Account";



export interface RefreshAccessTokenResult {
  accessToken: string;
  account: Account;
}
export interface IRefreshAccessToken {
  execute(refreshToken: string): Promise<RefreshAccessTokenResult>;
}