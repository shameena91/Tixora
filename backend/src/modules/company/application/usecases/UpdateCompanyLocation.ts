
import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyLocation } from "../../domain/Value-objects/CompanyLocation";

export class UpdateCompanyLocation {
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
      throw new Error("Company request not found");
    }
console.log("COMPANY REQUEST ID:", companyRequestId);
console.log("LOCATION:", location);console.log("COMPANY REQUEST ID:", companyRequestId);
console.log("LOCATION:", location);
    const updatedCompanyRequest =
      await this.companyRequestRepository.updateLocation(
        companyRequestId,
        location
      );

    await this.accountRepository.updateRegistrationStep(
      companyRequest.accountId,
      RegistrationStep.COMPANY_LOCATION
    );

    return updatedCompanyRequest;
  }
}