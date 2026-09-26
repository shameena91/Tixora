import {
  Company,
  CompanyStatus,
} from "../../domain/entities/Company";

import {
  ICompanyRepository,
} from "../../domain/repositories/ICompanyRepository";

import {
  ICreateCompany,
} from "../abstraction/ICreateCompany";

import {
  CompanyCreateData,
} from "../mappers/CompanyMapper";

export class CreateCompany
  implements ICreateCompany
{
  constructor(
    private readonly _companyRepository: ICompanyRepository
  ) {}

  async execute(
    data: CompanyCreateData
  ): Promise<Company> {

    const companyData: CompanyCreateData = {
      ...data,
      status: CompanyStatus.ACTIVE,
    };

    return await this._companyRepository.create(
      companyData
    );
  }
}