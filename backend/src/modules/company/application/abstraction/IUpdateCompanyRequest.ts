import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";

export interface IUpdateCompanyRequest{
  execute(
       id:string,
       data:UpdateCompanyRequestData
   ) :Promise<CompanyRequest>
}