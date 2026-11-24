import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { getUseCasesForAccount } from "../../../../shared/utills/getUseCasesForAccount";
import { IEmployeeUseCaseFactory } from "../../../employees/application/abstarction/IEmployeeUseCaseFactory";
import { EmployeeStatus } from "../../../employees/domain/entities/employee";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ILogin } from "../abstractions/ILogin";
import { LoginRequestDto, LoginResponseDto } from "../dto/LoginRequestDto";
import { AccountResponseMapper } from "../mappers/AccountResponseMapper";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { ITokenService } from "../ports/ITokenServices";

export class Login implements ILogin {
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenService: ITokenService,
     private readonly _employeeUseCaseFactory: IEmployeeUseCaseFactory,
  ) {}

  async execute(data: LoginRequestDto) :Promise<LoginResponseDto>{
    const account = await this._accountRepository.findByEmail(data.email);
console.log("LoginRequestDto" ,data)
    console.log("ACOUTTTTTTTTTTTT",account)

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
let employeeRole: string | null = null;
let permissions: string[] = [];

if (account.role === "EMPLOYEE") {
  const employeeUseCases = await getUseCasesForAccount(
    account.id,
    this._employeeUseCaseFactory,
  );

  const employee = await employeeUseCases
    .getEmployeeByAccountId
    .execute(account.id);

  if (
    !employee ||
    employee.status !== EmployeeStatus.ACTIVE ||
    !employee.employeeRole
  ) {
    throw new AppErrors(
      "Employee is not active or employee role is missing",
      HttpStatusCode.FORBIDDEN,
    );
  }

  employeeRole = employee.employeeRole;
  permissions = employee.permissions;
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

    return {
      accessToken,
      refreshToken,
      account: accountResponse,
      employeeRole,
      permissions
    };
  }
}
