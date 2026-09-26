import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";

import { Company } from "../entities/Company";

import { CompanyCreateData } from "../../application/mappers/CompanyMapper";

export interface ICompanyRepository
  extends IBaseRepository<
    Company,
    CompanyCreateData
  > {

  findByAccountId(
    accountId: string
  ): Promise<Company | null>;
}