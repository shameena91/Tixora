import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IRefreshAccessToken } from "../abstractions/IRefreshAccessToken";
import { ITokenService } from "../ports/ITokenServices";

export class RefreshAccessToken implements IRefreshAccessToken{
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    const account = await this.accountRepository.findById(payload.accountId);
    if (!account) {
      throw new AppErrors(MESSAGES.ACCOUNT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }
    const accessToken = this.tokenService.generateAccessToken({
      accountId: account.id,
      email: account.email,
    });
    return accessToken;
  }
}
