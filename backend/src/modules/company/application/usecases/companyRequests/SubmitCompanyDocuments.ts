import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { RegistrationStep } from "../../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { CompanyDocumentType } from "../../../domain/value-objects/CompanyDocuments";
import { ISubmitCompanyDocuments } from "../../abstraction/ISubmitCompanyDocuments";
// Aftre uploading each document submit the documents
export class SubmitCompanyDocuments implements ISubmitCompanyDocuments {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(companyRequestId: string) {
    const companyRequest =
      await this._companyRequestRepository.findById(companyRequestId);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    const requiredDocumentTypes = [
      CompanyDocumentType.REGISTRATION_CERTIFICATE,
      CompanyDocumentType.TAX_DOCUMENT,
      CompanyDocumentType.BUSINESS_LICENSE,
    ];

    const uploadedDocumentTypes =
      companyRequest.documents?.map((document) => document.documentType) ?? [];

    console.log("Uploaded document types:", uploadedDocumentTypes);

    console.log("Company documents:", companyRequest.documents);
    const allDocumentsUploaded = requiredDocumentTypes.every((documentType) =>
      uploadedDocumentTypes.includes(documentType),
    );

    if (!allDocumentsUploaded) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_ALL_DOCUMENTS_REQUIRED,
        ErrorCode.COMPANY_REQUEST_ALL_DOCUMENTS_REQUIRED,
      );
    }

    // now registrattion step as Documents uploaded
    await this._accountRepository.updateRegistrationStep(
      companyRequest.accountId,
      RegistrationStep.DOCUMENTS,
    );

    return companyRequest;
  }
}
