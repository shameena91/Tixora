import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CompanyLocation } from "../../domain/value-objects/CompanyLocation";

export interface IUpdateCompanyLocation{
    execute(
        companyRequestId: string,
        location: CompanyLocation
      ):Promise<CompanyRequest>
}