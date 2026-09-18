import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyDocumentType, DocumentVerificationStatus } from "../../domain/value-objects/CompanyDocuments";
import { IUpdateCompanyDocumentStatusUseCase } from "../abstraction/IUpdateCompanyDocumentStatusUseCase";

export class UpdateCompanyDocumentStatusUseCase implements IUpdateCompanyDocumentStatusUseCase  {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
  ) {}

  async execute(
    companyRequestId: string,
    documentType: CompanyDocumentType,
    status: DocumentVerificationStatus,
  ): Promise<void> {
    const companyRequest =
      await this.companyRequestRepository.findById(companyRequestId);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    companyRequest.updateDocumentStatus(
      documentType,
      status,
    );

    await this.companyRequestRepository.updateDocuments(
      companyRequestId,
      companyRequest.documents,
    );
  }
}