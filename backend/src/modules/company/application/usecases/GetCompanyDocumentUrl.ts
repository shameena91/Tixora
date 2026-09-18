import { IFileStoragePort } from "../ports/IFileStoragePort";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IGetCompanyDocumentUrl } from "../abstraction/IGetCompanyDocumentUrl";
import { MESSAGES } from "../../../../shared/constants/messages";
import { DocumentAccessType } from "../../domain/types/DocumentAccessType";

export class GetCompanyDocumentUrl implements IGetCompanyDocumentUrl{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly fileStorage: IFileStoragePort
  ) {}

   async execute(
    companyRequestId: string,
    documentType: string,
    accessType: DocumentAccessType,
  ): Promise<string> {
    const companyRequest =
      await this.companyRequestRepository.findById(companyRequestId);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    const document = companyRequest.documents.find(
      (doc) => doc.documentType === documentType,
    );

    if (!document) {
      throw new AppErrors(
        MESSAGES.DOCUMENT_NOT_FOUND,
        ErrorCode.DOCUMENT_NOT_FOUND,
      );
    }

    if (accessType === "view") {
      return await this.fileStorage.getSignedUrl(document.fileKey);
    }

    return await this.fileStorage.getSignedDownloadUrl(document.fileKey);
  }
}