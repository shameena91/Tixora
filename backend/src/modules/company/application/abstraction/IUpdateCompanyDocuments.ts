import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CompanyDocumentFile } from "../../domain/types/CompanyDocumentFile";

export interface IUpdateCompanyDocuments{
     execute(
        companyRequestId: string,
        document: CompanyDocumentFile
      ):Promise<CompanyRequest>
}