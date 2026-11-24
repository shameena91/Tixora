import { Account } from "../../domain/entities/Account";



export interface RefreshAccessTokenResult {
  accessToken: string;
  account: Account;
  companyId:string|null
  employeeRole:string|null
  permissions:string[]|null
}
export interface IRefreshAccessToken {
  execute(refreshToken: string): Promise<RefreshAccessTokenResult>;
}