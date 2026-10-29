import { CompanyRequestListItemDto } from "./CompanyRequestListItemDto";

export interface PaginatedCompanyRequestResponseDto {
  data: CompanyRequestListItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}





