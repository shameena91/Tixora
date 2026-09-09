import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export interface IMoreInfoCompanyRequest{
    execute(id:string):Promise<CompanyRequest>
}