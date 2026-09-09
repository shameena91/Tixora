import { Account } from "../../domain/entities/Account";
import { ITokenService } from "../ports/ITokenServices";


export interface RefreshAccessTokenResult {
  accessToken: string;
  account: Account;
}
export interface IRefreshAccessToken {
  execute(refreshToken: string): Promise<RefreshAccessTokenResult>;
}