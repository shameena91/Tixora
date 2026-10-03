import { Company } from "../entities/Company";
import { CompanyCreateData } from "../../application/mappers/CompanyMapper";

export interface ICompanyRepository {
  create(data: CompanyCreateData): Promise<Company>;

  findById(id: string): Promise<Company | null>;

  findAll(search?:string): Promise<Company[]>;

  findByAccountId(
    accountId: string
  ): Promise<Company | null>;
}