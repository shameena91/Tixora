import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface IResubmitCompanyRequest{
    execute(id: string): Promise<CompanyRequest>
}