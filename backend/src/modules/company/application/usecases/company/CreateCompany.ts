import { CompanyStatus } from "../../../domain/entities/Company";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { ICreateCompany } from "../../abstraction/company/ICreateCompany";
import {
  CreateCompanyRequestDto,
  CreateCompanyResponseDto,
} from "../../dto/CreateCompanyDto";
import { CompanyCreateData } from "../../mappers/CompanyMapper";

export class CreateCompany implements ICreateCompany {
  constructor(private readonly _companyRepository: ICompanyRepository) {}

  async execute(
    data: CreateCompanyRequestDto,
  ): Promise<CreateCompanyResponseDto> {
    const companyData: CompanyCreateData = {
      ...data,
      status: CompanyStatus.ACTIVE,
    };

    return await this._companyRepository.create(companyData);
  }
}
