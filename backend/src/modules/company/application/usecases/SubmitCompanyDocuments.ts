import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyDocumentType } from "../../domain/Value-objects/CompanyDocuments";

export class SubmitCompanyDocuments {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly accountRepository: IAccountRepository
  ) {}

  async execute(companyRequestId: string) {
    const companyRequest =
      await this.companyRequestRepository.findById(
        companyRequestId
      );

    if (!companyRequest) {
      throw new Error("Company request not found");
    }

    const requiredDocumentTypes = [
  CompanyDocumentType.REGISTRATION_CERTIFICATE,
  CompanyDocumentType.TAX_DOCUMENT,
  CompanyDocumentType.BUSINESS_LICENSE,
];

const uploadedDocumentTypes =
  companyRequest.documents?.map(
    (document) => document.documentType
  ) ?? [];

const allDocumentsUploaded =
  requiredDocumentTypes.every(
    (documentType) =>
      uploadedDocumentTypes.includes(documentType)
  );

if (!allDocumentsUploaded) {
  throw new Error("Please upload all required documents");
}
await this.accountRepository.updateRegistrationStep(
      companyRequest.accountId,
      RegistrationStep.DOCUMENTS
    );

    return companyRequest;
  }
}