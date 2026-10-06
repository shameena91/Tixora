import { CompanyStatus } from "../../../domain/entities/Company";
import { UpdateCompanyStatusResponseDto } from "../../dto/UpdateCompanyStatusResponseDto";

export interface IUpdateCompanyStatus {
  execute(
    companyId: string,
    status: CompanyStatus,
  ): Promise<UpdateCompanyStatusResponseDto>;
}