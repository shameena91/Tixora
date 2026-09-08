import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface ISubmitCompanyDocuments{
    execute(companyRequestId: string) :Promise<CompanyRequest>
}