import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface IRejectCompanyRequest{
    execute(id:string):Promise<CompanyRequest>
}