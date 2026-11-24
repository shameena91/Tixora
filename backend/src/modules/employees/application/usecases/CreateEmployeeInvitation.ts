
import { EmployeeInvitation } from "../../domain/entities/EmployeeInvitation";
import { IEmployeeInvitationRepository } from "../../domain/repositories/IEmployeeInvitationRepository";
import { env } from "../../../../config/env";
import { IEmailService } from "../../../auth/application/ports/IEmailService";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { AccountStatus } from "../../../auth/domain/entities/Account";
import { ITokenService } from "../ports/ITokenService";
import { ICreateEmployeeInvitation } from "../abstarction/ICreateEmployeeInvitation";
import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";

export class CreateEmployeeInvitationUseCase
  implements ICreateEmployeeInvitation
{
  constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _invitationRepository: IEmployeeInvitationRepository,
    private readonly _emailService: IEmailService,
    private readonly _tokenService: ITokenService,
    private readonly _companyRepository:ICompanyRepository,
  ) {}

  async execute(
    accountId: string,
    invitedByAccountId: string,
  ): Promise<void> {
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    if (account.status !== AccountStatus.PENDING) {
      throw new Error("Invitation can only be sent to pending accounts");
    }

    const rawToken = this._tokenService.generateToken();
    const tokenHash = this._tokenService.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
const company = await this._companyRepository.findByAccountId(
  invitedByAccountId,
);

if (!company) {
  throw new Error("Company not found");
}

const companyId = company.id;
    const existingInvitation =
      await this._invitationRepository.findByAccountId(accountId);

    if (existingInvitation) {
      existingInvitation.renew(tokenHash, expiresAt);

      await this._invitationRepository.updateInvitation(accountId, {
        tokenHash: existingInvitation.tokenHash,
        expiresAt: existingInvitation.expiresAt,
        acceptedAt: existingInvitation.acceptedAt,
      });
    } else {
      const invitation = new EmployeeInvitation(
        "",
        accountId,
        invitedByAccountId,
        companyId,
        tokenHash,
        expiresAt,
        null,
        new Date(),
        new Date(),
      );

      await this._invitationRepository.createInvitation(invitation);
    }

    const invitationLink =
      `${env.frontendUrl}/accept-invitation?token=${rawToken}`;

    await this._emailService.sendInvitation(
      account.email,
      invitationLink,
    );
  }
}
