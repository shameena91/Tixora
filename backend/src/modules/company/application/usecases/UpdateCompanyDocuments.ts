import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyDocumentFile } from "../../domain/types/CompanyDocumentFile";
import { CompanyDocument } from "../../domain/Value-objects/CompanyDocuments";
import { IFileStoragePort } from "../ports/IFileStoragePort";

export class UpdateCompanyDocuments {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly accountRepository: IAccountRepository,
     private readonly fileStorage: IFileStoragePort
  ) {}

  async execute(
    companyRequestId: string,
    documents: CompanyDocumentFile[]
  ) {
    const companyRequest =
      await this.companyRequestRepository.findById(
        companyRequestId
      );

    if (!companyRequest) {
      throw new Error("Company request not found");
    }

const uploadedDocuments :CompanyDocument[] = await Promise.all(
  documents.map(async (document) => {
    const fileUrl = await this.fileStorage.upload(
      document.file,
      document.fileName,
      document.mimeType
    );

    return {
      documentType: document.documentType,
      fileUrl,
      fileName: document.fileName,
      mimeType: document.mimeType,
    };
  })
);

    const updatedCompanyRequest =
      await this.companyRequestRepository.updateDocuments(
        companyRequestId,
        uploadedDocuments
      );

    await this.accountRepository.updateRegistrationStep(
      companyRequest.accountId,
      RegistrationStep.DOCUMENTS
    );

    return updatedCompanyRequest;
  }
}