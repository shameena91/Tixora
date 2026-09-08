import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompleteCompanyRegistration } from "../abstraction/ICompleteCompanyRegistration";

// when submitting all the datas and review page the company registration completed

export class CompleteCompanyRegistration implements ICompleteCompanyRegistration {
  constructor(
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute(accountId: string): Promise<void> {
    const account =
      await this.accountRepository.findById(accountId);

    if (!account) {
  throw new AppErrors(
    MESSAGES.ACCOUNT_NOT_FOUND,
    ErrorCode.ACCOUNT_NOT_FOUND  

  );
}

    await this.accountRepository.updateRegistrationStep(
      accountId,
      RegistrationStep.COMPLETED
    );
  }
}