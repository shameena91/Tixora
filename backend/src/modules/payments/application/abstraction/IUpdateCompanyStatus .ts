import { CompanyDetailsResponse } from "../../../company/application/dto/GetCompanyDto";
import { Company, CompanyStatus } from "../../../company/domain/entities/Company";

export interface IUpdateCompanyStatus {
  execute(
    companyId: string,
    status: CompanyStatus,
  ): Promise<CompanyDetailsResponse>;
}