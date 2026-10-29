import { CompanyRequest } from "../../../domain/entities/CompanyRequest";


export interface IRejectCompanyRequest {
  execute(
    id: string,
    rejectionReason: string,
  ): Promise<CompanyRequest>;
}
