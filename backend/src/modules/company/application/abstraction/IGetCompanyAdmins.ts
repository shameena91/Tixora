import { GetAdminListDto } from "../dto/GetAdminListDto";



export interface IGetCompanyAdmins {
  execute(companyId: string): Promise<GetAdminListDto>;
}
