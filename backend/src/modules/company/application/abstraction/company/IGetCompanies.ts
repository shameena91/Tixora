import { GetCompaniesPaginatedResponseDto } from "../../dto/GetCompanyListDto";

export interface IGetCompanies {
  execute(
    search: string | undefined,
    page: number,
    limit: number,
  ): Promise<GetCompaniesPaginatedResponseDto>;
}