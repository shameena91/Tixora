
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { AccountStatus } from "../../../auth/domain/entities/Account";
import { IEmployeeInvitationRepository } from "../../domain/repositories/IEmployeeInvitationRepository";
import { IPasswordHasher } from "../../../auth/application/ports/IPasswordHasher";
import { ITokenService } from "../ports/ITokenService";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { EmployeeStatus } from "../../domain/entities/employee";
import { IEmployeeUseCaseFactory } from "../abstarction/IEmployeeUseCaseFactory";

interface AcceptEmployeeInvitationDTO {
  token: string;
  password: string;
  confirmPassword: string;
}

export class AcceptEmployeeInvitation {
  constructor(
    private readonly invitationRepository: IEmployeeInvitationRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly tokenService: ITokenService,
    private readonly passwordHasher: IPasswordHasher,
    private readonly employeeUseCaseFactory: IEmployeeUseCaseFactory,
  ) {}

  async execute(dto: AcceptEmployeeInvitationDTO): Promise<void> {
    const { token, password, confirmPassword } = dto;

    if (!token) {
      throw new AppErrors(
        "Invitation token is required",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (password !== confirmPassword) {
      throw new AppErrors(
        "Passwords do not match",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const tokenHash = this.tokenService.hashToken(token);

    const invitation =
      await this.invitationRepository.findByTokenHash(tokenHash);

    if (!invitation) {
      throw new AppErrors(
        "Invalid invitation token",
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    if (!invitation.isValid()) {
      throw new AppErrors(
        "Invitation link is expired or already used",
        HttpStatusCode.CONFLICT,
      );
    }

    const account = await this.accountRepository.findById(
      invitation.accountId,
    );

    if (!account) {
      throw new AppErrors(
        "Account not found",
        HttpStatusCode.NOT_FOUND,
      );
    }

    if (account.status !== AccountStatus.PENDING) {
      throw new AppErrors(
        "Account is already activated",
        HttpStatusCode.CONFLICT,
      );
    }

    const employeeUseCases =
      await this.employeeUseCaseFactory.createForAccount(
        invitation.invitedByAccountId,
      );

    if (!employeeUseCases) {
      throw new AppErrors(
        "Employee company not found",
        HttpStatusCode.NOT_FOUND,
      );
    }

    const passwordHash = await this.passwordHasher.hash(password);

 
    const isEmployeeActivated =
      await employeeUseCases.activateInvitedEmployee(
        invitation.accountId,
        EmployeeStatus.ACTIVE,
      );

    if (!isEmployeeActivated) {
      throw new AppErrors(
        "Failed to activate employee",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
await employeeUseCases.assignDepartmentManager(
  invitation.accountId,
);
    
    try {
     await this.accountRepository.updateDetails(
  invitation.accountId,
  {
    passwordHash,
    status: AccountStatus.ACTIVE,
    companyId: invitation.companyId.toString(),
  },
);
    } catch (error) {
      
      const isRestored =
        await employeeUseCases.activateInvitedEmployee(
          invitation.accountId,
          EmployeeStatus.PENDING,
        );

      if (!isRestored) {
        throw new AppErrors(
          "Account activation failed and employee status rollback failed",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        );
      }

      throw error;
    }

    // Mark Invitation as accepted
    await this.invitationRepository.updateInvitation(
      invitation.accountId,
      {
        acceptedAt: new Date(),
      },
    );
  }
}
