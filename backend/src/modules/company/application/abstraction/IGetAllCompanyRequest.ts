import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CompanyRequestListItem } from "../dto/CompanyRequestListItem";

export interface IGetAllCompanyRequest {
  execute(): Promise<CompanyRequestListItem[]>;
}