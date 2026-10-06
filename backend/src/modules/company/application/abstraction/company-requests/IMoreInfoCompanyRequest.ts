import { CompanyRequest } from "../../../domain/entities/CompanyRequest";

export interface IMoreInfoCompanyRequest{
    execute(id:string,reviewedBy:string,remarks:string):Promise<CompanyRequest>
}