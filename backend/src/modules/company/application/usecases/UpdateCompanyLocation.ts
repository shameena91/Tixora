
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyLocation } from "../../domain/value-objects/CompanyLocation";
import { IUpdateCompanyDocuments } from "../abstraction/IUpdateCompanyDocuments";
import { IUpdateCompanyLocation } from "../abstraction/IUpdateCompanyLocation";


// After company Information ading location dadetails
export class UpdateCompanyLocation implements IUpdateCompanyLocation{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute(
    companyRequestId: string,
    location: CompanyLocation
  ) {
    const companyRequest =
      await this.companyRequestRepository.findById(
        companyRequestId
      );
console.log("COMPANY REQUEST:", companyRequest);
console.log("STATUS:", companyRequest?.status);
  if (!companyRequest) {
  throw new AppErrors(
    MESSAGES.COMPANY_REQUEST_NOT_FOUND,
      ErrorCode.COMPANY_REQUEST_NOT_FOUND

  );
}
console.log("COMPANY REQUEST ID:", companyRequestId);
console.log("LOCATION:", location);console.log("COMPANY REQUEST ID:", companyRequestId);
console.log("LOCATION:", location);
    const updatedCompanyRequest =
      await this.companyRequestRepository.updateLocation(
        companyRequestId,
        location
      );
// Company registration Step as company location
    await this.accountRepository.updateRegistrationStep(
      companyRequest.accountId,
      RegistrationStep.COMPANY_LOCATION
    );

    return updatedCompanyRequest;
  }
}