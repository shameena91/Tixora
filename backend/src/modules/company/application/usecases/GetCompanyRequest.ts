import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IGetCompanyRequest } from "../abstraction/IGetCompanyRequest";
import { CompanyRequestDetails } from "../dto/CompanyrequestDetailsDto";
// Review before final submission
export class GetCompanyRequest implements IGetCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute(id: string): Promise<CompanyRequestDetails> { 
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND
      );
    }
 const account =
    await this.accountRepository.findById(
      companyRequest.accountId
    );

  console.log("Accountttttttt:", account);
    return {
  id: companyRequest.id,

  company: {
    companyName: companyRequest.companyName,
    registrationNumber: companyRequest.registrationNumber,
    companyEmail: companyRequest.companyEmail,
    phone: companyRequest.phone,
    yearEstablished: companyRequest.yearEstablished,
    companyType: companyRequest.companyType,
    numberOfEmployees: companyRequest.numberOfEmployees,
    website: companyRequest.website,
    logo: companyRequest.logo,
    description: companyRequest.description,
  },

  admin: {
    name: account
      ? `${account.firstName} ${account.lastName}`
      : "Unknown",
    email: account?.email ?? "Unknown",
    phone: account?.phone ?? "Unknown",
    designation: account?.designation ?? "Unknown",
  },

  status: companyRequest.status,

  location: companyRequest.location,
  documents: companyRequest.documents,

  createdAt: companyRequest.createdAt,
  updatedAt: companyRequest.updatedAt,
};
  
}
}