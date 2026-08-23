import { ITokenService } from "../ports/ITokenServices";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class RefreshAccessToken {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly tokenService: ITokenService
  ) {}

  async execute(refreshToken: string): Promise<string> {
  const payload =
    this.tokenService.verifyRefreshToken(refreshToken);
     const account =
    await this.accountRepository.findById(payload.accountId);
     if (!account) {
    throw new Error("Account not found");
  }
   const accessToken =
      this.tokenService.generateAccessToken({
        accountId: account.id,
        email: account.email,
      });
        return accessToken;
  }
  
}