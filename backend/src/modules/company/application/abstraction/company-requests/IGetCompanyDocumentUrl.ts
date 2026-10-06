import { DocumentAccessType } from "../../domain/types/DocumentAccessType";
import { CompanyDocumentType } from "../../domain/value-objects/CompanyDocuments";

export interface IGetCompanyDocumentUrl {
  execute(
    companyRequestId: string,
    documentType: CompanyDocumentType,
    accessType:DocumentAccessType
  ): Promise<string>;
}