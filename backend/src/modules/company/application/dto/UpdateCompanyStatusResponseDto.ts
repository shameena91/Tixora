import { CompanyStatus } from "../../domain/entities/Company";

export interface UpdateCompanyStatusResponseDto {
  id: string;
  companyName: string;
  status: CompanyStatus;
}