import { CompanyRequestStatus } from "../../../domain/entities/CompanyRequest";
import { PaginatedCompanyRequestResponseDto } from "../../dto/GetAllCompanyResponseDto";

export interface IGetAllCompanyRequest {
  execute(params: {
    page: number;
    limit: number;
    search?: string;
    status?: CompanyRequestStatus;
  }): Promise<PaginatedCompanyRequestResponseDto>;
}