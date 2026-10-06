import { CompanyDetailsResponse } from "../../dto/GetCompanyDto";

export interface IGetCompanyDetails {
  execute(companyId: string): Promise<CompanyDetailsResponse>;
}