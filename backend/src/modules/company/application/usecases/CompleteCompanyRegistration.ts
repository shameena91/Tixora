import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";

export class CompleteCompanyRegistration {
  constructor(
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute(accountId: string): Promise<void> {
    const account =
      await this.accountRepository.findById(accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    await this.accountRepository.updateRegistrationStep(
      accountId,
      RegistrationStep.COMPLETED
    );
  }
}