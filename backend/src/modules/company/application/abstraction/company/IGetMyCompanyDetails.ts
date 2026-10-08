import { CompanyDetailsResponse } from "../../dto/GetCompanyDto";

export interface IGetMyCompanyDetails {
  execute(accountId: string): Promise<CompanyDetailsResponse>;
}