import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CompanyRequestListItemDto } from "../dto/CompanyRequestListItemDto";

export interface IGetAllCompanyRequest {
  execute(): Promise<CompanyRequestListItemDto[]>;
}