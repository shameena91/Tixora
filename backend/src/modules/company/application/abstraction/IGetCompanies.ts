import { GetCompanyListResponseDto } from "../dto/GetCompanyListDto";

export interface IGetCompanies{
    execute( search?: string):Promise<GetCompanyListResponseDto[]>
}