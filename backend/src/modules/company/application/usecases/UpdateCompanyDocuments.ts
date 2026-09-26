import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyDocumentFile } from "../../domain/types/CompanyDocumentFile";
import { CompanyDocument, DocumentVerificationStatus } from "../../domain/value-objects/CompanyDocuments";
import { IUpdateCompanyDocuments } from "../abstraction/IUpdateCompanyDocuments";
import { IFileStoragePort } from "../ports/IFileStoragePort";
// Adding company Documents only adding each documents not submitting at this step
export class UpdateCompanyDocuments implements IUpdateCompanyDocuments{
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    companyRequestId: string,
    document: CompanyDocumentFile
  ) {
    const companyRequest =
      await this._companyRequestRepository.findById(companyRequestId);

    if (!companyRequest) {
        throw new AppErrors(
    MESSAGES.COMPANY_REQUEST_NOT_FOUND,
     ErrorCode.COMPANY_REQUEST_NOT_FOUND

  );
    }

    const documentPath =
      `company-requests/${companyRequestId}/documents`;

    const uploadedFile = await this._fileStorage.upload(
      document.file,
      document.fileName,
      document.mimeType,
      documentPath
    );

   const newDocument: CompanyDocument = {
  documentType: document.documentType,
  fileName: document.fileName,
    fileKey: uploadedFile.key,
  fileUrl: uploadedFile.url,
  uploadedAt: new Date(),
  verificationStatus: DocumentVerificationStatus.PENDING,
};

    const existingDocuments =
      companyRequest.documents ?? [];

    const updatedDocuments: CompanyDocument[] = [
      ...existingDocuments.filter(
        (doc) => doc.documentType !== newDocument.documentType
      ),
      newDocument,
    ];

   try {
  const updatedCompanyRequest =
    await this._companyRequestRepository.updateDocuments(
      companyRequestId,
      updatedDocuments
    );

  return updatedCompanyRequest;
} catch (error) {
 try {
    await this._fileStorage.delete(uploadedFile.key);
  } catch (deleteError) {
    console.error(
      "Failed to cleanup S3 file:",
      deleteError
    );
  }

  throw error;
}
}
}
