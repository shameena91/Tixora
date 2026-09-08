import { ITokenService } from "../ports/ITokenServices";

export interface IRefreshAccessToken {
  execute(refreshToken: string): Promise<string>;
}