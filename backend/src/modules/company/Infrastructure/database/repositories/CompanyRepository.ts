import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { CompanyCreateData, CompanyMapper } from "../../../application/mappers/CompanyMapper";
import { Company } from "../../../domain/entities/Company";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";



import {
  CompanyDocument,
  CompanyModel,
} from "../models/CompanyModel";

export class CompanyRepository
  implements ICompanyRepository
{
  constructor(
    private readonly baseRepository: BaseRepository<
      CompanyDocument,
      CompanyCreateData
    >
  ) {}

  // ------------------------------------
  // Create Company
  // ------------------------------------
  async create(
    data: CompanyCreateData
  ): Promise<Company> {

    const companyDocument =
      await this.baseRepository.create(data);

    return CompanyMapper.toDomain(
      companyDocument
    );
  }

  // ------------------------------------
  // Find Company By ID
  // ------------------------------------
  async findById(
    id: string
  ): Promise<Company | null> {

    const document =
      await this.baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(
      document
    );
  }

  // ------------------------------------
  // Find All Companies
  // ------------------------------------
  async findAll(): Promise<Company[]> {

    const documents =
      await this.baseRepository.findAll();

    return documents.map((document) =>
      CompanyMapper.toDomain(document)
    );
  }

  // ------------------------------------
  // Find Company By Account ID
  // ------------------------------------
  async findByAccountId(
    accountId: string
  ): Promise<Company | null> {

    const document =
      await CompanyModel.findOne({
        accountId,
      })
        .lean<CompanyDocument>()
        .exec();

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(
      document
    );
  }
}