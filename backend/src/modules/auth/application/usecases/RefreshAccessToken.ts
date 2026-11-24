import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { getUseCasesForAccount } from "../../../../shared/utills/getUseCasesForAccount";
import { IEmployeeUseCaseFactory } from "../../../employees/application/abstarction/IEmployeeUseCaseFactory";
import { EmployeeStatus } from "../../../employees/domain/entities/employee";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IRefreshAccessToken, RefreshAccessTokenResult } from "../abstractions/IRefreshAccessToken";
import { ITokenService } from "../ports/ITokenServices";

export class RefreshAccessToken implements IRefreshAccessToken{
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _tokenService: ITokenService,
       private readonly _employeeUseCaseFactory: IEmployeeUseCaseFactory,
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
    return {
  accessToken,
  account,
  employeeRole,
  permissions,
  companyId: account.companyId ?? null,
};
  }
}
