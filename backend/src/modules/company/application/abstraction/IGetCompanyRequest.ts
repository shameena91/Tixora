import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CompanyRequestDetails } from "../dto/CompanyrequestDetailsDto";

export interface IGetCompanyRequest{
    execute(id:string):Promise<CompanyRequestDetails>
}