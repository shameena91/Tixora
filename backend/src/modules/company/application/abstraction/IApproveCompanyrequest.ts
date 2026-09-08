import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface IApproveCompanyRequest {
  execute(id: string): Promise<CompanyRequest>;
}