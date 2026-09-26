import { Company } from "../../domain/entities/Company";
import { CompanyCreateData } from "../mappers/CompanyMapper";

export interface ICreateCompany {
  execute(
    data: CompanyCreateData
  ): Promise<Company>;
}