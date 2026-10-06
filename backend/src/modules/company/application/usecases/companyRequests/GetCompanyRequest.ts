import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IGetCompanyRequest } from "../../abstraction/company-requests/IGetCompanyRequest";
import { CompanyRequestDetails } from "../../dto/CompanyrequestDetailsDto";
import { IFileStoragePort } from "../../ports/IFileStoragePort";

export class GetCompanyRequest implements IGetCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _accountRepository: IAccountRepository,
    private readonly _s3Service: IFileStoragePort,
  ) {}

  async execute(id: string): Promise<CompanyRequestDetails> {
    const companyRequest = await this._companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }
    const account = await this._accountRepository.findById(
      companyRequest.accountId,
    );
    const logoUrl = companyRequest.logo
      ? await this._s3Service.getSignedUrl(companyRequest.logo)
      : null;
    console.log("Accountttttttt:", companyRequest);
    return {
      id: companyRequest.id,

      company: {
        companyName: companyRequest.companyName,
        requestId: companyRequest.requestId,
        registrationNumber: companyRequest.registrationNumber,
        companyEmail: companyRequest.companyEmail,
        phone: companyRequest.phone,
        yearEstablished: companyRequest.yearEstablished,
        companyType: companyRequest.companyType,
        numberOfEmployees: companyRequest.numberOfEmployees,
        website: companyRequest.website,
        logo: logoUrl,
        description: companyRequest.description,
      },

      admin: {
        name: account ? `${account.firstName} ${account.lastName}` : "Unknown",
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
