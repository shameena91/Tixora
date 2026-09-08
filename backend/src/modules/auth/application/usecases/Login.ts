import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ILogin } from "../abstractions/ILogin";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { AccountResponseMapper } from "../mappers/Accountmapper";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { ITokenService } from "../ports/ITokenServices";

export class Login implements ILogin {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(data: LoginRequestDto) {
    const account = await this.accountRepository.findByEmail(data.email);

    if (!account) {
      throw new AppErrors(
        MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    if (!account.passwordHash) {
      throw new AppErrors(
        MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await this.passwordHasher.compare(
      data.password,
      account.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppErrors(
        MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const accessToken = await this.tokenService.generateAccessToken({
      accountId: account.id,
      email: account.email,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      accountId: account.id,
    });

    const accountResponse = AccountResponseMapper.toLoginAccount(account);
console.log(accountResponse)
    return {
      accessToken,
      refreshToken,
      account: accountResponse,
    };
  }
}
