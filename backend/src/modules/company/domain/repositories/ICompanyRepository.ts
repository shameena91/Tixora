
import {
  IBaseRepository,
  PaginatedResult,
} from "../../../../shared/repository/IBaseRepository";
import { CompanyCreateData } from "../../application/mappers/CompanyMapper";

import {
  Company,
  CompanyStatus,
} from "../entities/Company";

export interface ICompanyRepository
  extends IBaseRepository<Company, CompanyCreateData> {

  findAllBySearch(
    search?: string,
  ): Promise<Company[]>;

  findByAccountId(
    accountId: string,
  ): Promise<Company | null>;

  updateStatus(
    id: string,
    status: CompanyStatus,
  ): Promise<Company>;

  findAllPaginated(
    search: string | undefined,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Company>>;

 
}