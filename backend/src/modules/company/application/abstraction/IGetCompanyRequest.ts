import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface IGetCompanyRequest{
    execute(id:string):Promise<CompanyRequest>
}