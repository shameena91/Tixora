import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import { ITenantRepository } from "../../../domain/entities/repositories/ITenantrepository";

import { Tenant } from "../../../domain/entities/Tenant";

import {
    TenantCreateData,
    TenantMapper,
} from "../../../application/mappers/TenantMapper";

import {
    TenantDocument
} from "../models/TenantModel";

export class TenantRepository
  implements ITenantRepository {

  constructor(
    private readonly _baseRepository: BaseRepository<
      TenantDocument,
      TenantCreateData
    >,
  ) {}

  async create(
    data: TenantCreateData,
  ): Promise<Tenant> {

    const document =
      await this._baseRepository.create(data);

    return TenantMapper.toDomain(document);
  }

  async findById(
    id: string,
  ): Promise<Tenant | null> {

    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return TenantMapper.toDomain(document);
  }

  async findOne(
    filter: Partial<Tenant>,
  ): Promise<Tenant | null> {

    const document =
      await this._baseRepository.findOne(
        filter as Partial<TenantDocument>,
      );

    if (!document) {
      return null;
    }

    return TenantMapper.toDomain(document);
  }

  async findAll(
    filter?: Partial<Tenant>,
    sort?: Record<string, 1 | -1>,
  ): Promise<Tenant[]> {

    const documents =
      await this._baseRepository.findAll(
        filter as Partial<TenantDocument>,
        sort,
      );

    return documents.map(
      (document) =>
        TenantMapper.toDomain(document),
    );
  }

  async update(
    filter: Partial<Tenant>,
    data: Partial<Tenant>,
  ): Promise<Tenant | null> {

    const document =
      await this._baseRepository.update(
        filter as Partial<TenantDocument>,
        data as Partial<TenantDocument>,
      );

    if (!document) {
      return null;
    }

    return TenantMapper.toDomain(document);
  }

  async findByCompanyId(
    companyId: string,
  ): Promise<Tenant | null> {

    const document =
      await this._baseRepository.findOne({
        companyId,
      });

    if (!document) {
      return null;
    }

    return TenantMapper.toDomain(document);
  }
}