import { QueryFilter } from "mongoose";
import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import {
  CompanyCreateData,
  CompanyMapper,
} from "../../../application/mappers/CompanyMapper";
import { Company, CompanyStatus } from "../../../domain/entities/Company";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";

import { CompanyDocument, CompanyModel } from "../models/CompanyModel";
import { CompanyDetailsResponse } from "../../../application/dto/GetCompanyDto";

export class CompanyRepository implements ICompanyRepository {
  constructor(
    private readonly baseRepository: BaseRepository<
      CompanyDocument,
      CompanyCreateData
    >,
  ) {}

  async create(data: CompanyCreateData): Promise<Company> {
    const companyDocument = await this.baseRepository.create(data);

    return CompanyMapper.toDomain(companyDocument);
  }

  async findById(id: string): Promise<Company | null> {
    const document = await this.baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  async findAll(search?: string): Promise<Company[]> {
    const filter: QueryFilter<CompanyDocument> = search
      ? {
          $or: [
            {
              companyName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              companyEmail: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const documents = await this.baseRepository.findAll(filter, {
      createdAt: -1,
    });

    return documents.map((document) => CompanyMapper.toDomain(document));
  }

  async findByAccountId(accountId: string): Promise<Company | null> {
    const document = await CompanyModel.findOne({
      accountId,
    })
      .lean<CompanyDocument>()
      .exec();

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  async updateStatus(
    companyId: string,
    status: CompanyStatus,
  ): Promise<Company> {
    const companyDocument = await this.baseRepository.update(
      { _id: companyId },
      {
        status,
        updatedAt: new Date(),
      },
    );

    if (!companyDocument) {
      throw new Error("Company not found");
    }

    return CompanyMapper.toDomain(companyDocument);
  }
}
