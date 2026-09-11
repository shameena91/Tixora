import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { CreateNotification } from "../../../notification/application/usecases/CreateNotification";
import { NotificationType } from "../../../notification/domain/entities/Notification";
import { INotificationRepository } from "../../../notification/domain/repositories/INotificationrepository";
import { NotificationRepository } from "../../../notification/infrastructure/repository/NotificationRepository";
import { ICompleteCompanyRegistration } from "../abstraction/ICompleteCompanyRegistration";

// when submitting all the datas and review page the company registration completed

export class CompleteCompanyRegistration implements ICompleteCompanyRegistration {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly createNotification:CreateNotification
    
  ) {}

  async execute(accountId: string,companyRequestId:string): Promise<void> {
    const account =
      await this.accountRepository.findById(accountId);
      const superAdmin= await this.accountRepository.findSuperAdmin()
         if (!superAdmin) {
  throw new AppErrors(
    MESSAGES.ACCOUNT_NOT_FOUND,
    ErrorCode.ACCOUNT_NOT_FOUND  

  );
}


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
  console.log("from usecase",companyRequestId)

  await this.createNotification.execute({
  recipientId: superAdmin.id,
  type: NotificationType.COMPANY_REQUEST,
  title: "New Company Registration Request",
  message: "A new company registration request has been submitted.",
  referenceId: companyRequestId,
});
  }
}