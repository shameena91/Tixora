import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ILogin } from "../abstractions/ILogin";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { AccountResponseMapper } from "../mappers/AccountResponseMapper";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { ITokenService } from "../ports/ITokenServices";

export class Login implements ILogin {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(data: LoginRequestDto) {
    const account = await this._accountRepository.findByEmail(data.email);

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
console.log("ACCOUNT ROLE:login", account.role);
    const isPasswordValid = await this._passwordHasher.compare(
      data.password,
      account.passwordHash,
    );

    if (!isPasswordValid) {
      throw new AppErrors(
        MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const accessToken = await this._tokenService.generateAccessToken({
      accountId: account.id,
      email: account.email,
      role:account.role
    });

    const refreshToken = this._tokenService.generateRefreshToken({
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
