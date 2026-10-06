import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IRefreshAccessToken, RefreshAccessTokenResult } from "../abstractions/IRefreshAccessToken";
import { ITokenService } from "../ports/ITokenServices";

export class RefreshAccessToken implements IRefreshAccessToken{
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<RefreshAccessTokenResult> {
    const payload = this._tokenService.verifyRefreshToken(refreshToken);
    const account = await this._accountRepository.findById(payload.accountId);
    if (!account) {
      throw new AppErrors(MESSAGES.ACCOUNT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }
    const accessToken = this._tokenService.generateAccessToken({
      accountId: account.id,
      email: account.email,
      role:account.role
    });
    return {accessToken,account};
  }
}
