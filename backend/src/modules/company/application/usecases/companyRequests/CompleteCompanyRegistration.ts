// When submitting all the data from the review page,

import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { RegistrationStep } from "../../../../auth/domain/enums/RegistrationStep";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";
import { ICompleteCompanyRegistration } from "../../abstraction/ICompleteCompanyRegistration";


export class CompleteCompanyRegistration implements ICompleteCompanyRegistration {
  constructor(
    private readonly _accountRepository: IAccountRepository,

    private readonly _createTimeline: ICreateTimeline,
  ) {}

  async execute(accountId: string, companyRequestId: string): Promise<void> {
    const account = await this._accountRepository.findById(accountId);

    if (!account) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    const superAdmin = await this._accountRepository.findSuperAdmin();

    if (!superAdmin) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    await this._accountRepository.updateRegistrationStep(
      accountId,
      RegistrationStep.COMPLETED,
    );

    await this._createTimeline.execute({
      entityType: TimelineEntityType.COMPANY_REQUEST,
      entityId: companyRequestId,
      action: "SUBMITTED",
      description: "Company registration request submitted",
      performedBy: accountId,
      metadata: null,
      createdAt: new Date(),
    });

    // await this._createNotification.execute({
    //   recipientId: superAdmin.id,
    //   type: NotificationType.COMPANY_REQUEST,
    //   title: "New Company Registration Request",
    //   message: "A new company registration request has been submitted.",
    //   referenceId: companyRequestId,
    // });
  }
}
