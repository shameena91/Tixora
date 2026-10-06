import { CompanyDocumentType, DocumentVerificationStatus } from "../../../domain/value-objects/CompanyDocuments";

export interface IUpdateCompanyDocumentStatusUseCase{
    execute(
        companyRequestId: string,
        documentType: CompanyDocumentType,
         status: DocumentVerificationStatus,
      ):Promise<void>
}