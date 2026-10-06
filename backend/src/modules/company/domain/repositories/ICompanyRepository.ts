import { Company, CompanyStatus } from "../entities/Company";
import { CompanyCreateData } from "../../application/mappers/CompanyMapper";

export interface ICompanyRepository {
  create(data: CompanyCreateData): Promise<Company>;

  findById(id: string): Promise<Company | null>;

  findAll(search?: string): Promise<Company[]>;

  findByAccountId(accountId: string): Promise<Company | null>;

  updateStatus(id: string, status: CompanyStatus): Promise<Company>;
}
