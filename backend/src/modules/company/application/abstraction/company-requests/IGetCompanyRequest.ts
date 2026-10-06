import { CompanyRequestDetails } from "../../dto/CompanyrequestDetailsDto";

export interface IGetCompanyRequest{
    execute(id:string):Promise<CompanyRequestDetails>
}