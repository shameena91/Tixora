import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import {
  CompanyRequestDocument,
  CompanyRequestCreateData,
  CompanyRequestMapper,
} from "../../../application/mappers/CompanyRequestMappers";

import {
  CompanyRequest,
  CompanyRequestStatus,
} from "../../../domain/entities/CompanyRequest";

import {
  ICompanyRequestRepository,
} from "../../../domain/repositories/ICompanyRequestRepository";

import {
  UpdateCompanyRequestData,
} from "../../../domain/types/UpdateCompanyRequesstData";

import {
  CompanyDocument,
} from "../../../domain/value-objects/CompanyDocuments";

import {
  CompanyLocation,
} from "../../../domain/value-objects/CompanyLocation";

import {
  CompanyRequestModel,
} from "../models/CompanyRequestModel";

export class CompanyRequestRepository
  implements ICompanyRequestRepository
{
  constructor(
    private readonly baseRepository: BaseRepository<
      CompanyRequestDocument,
      CompanyRequestCreateData
    >,
  ) {}

  // -------------------------
  // Common CRUD
  // -------------------------

  async create(
    companyRequest: CompanyRequest,
  ): Promise<CompanyRequest> {
    const persistenceData =
      CompanyRequestMapper.toPersistence(
        companyRequest,
      );

    const companyRequestDocument =
      await this.baseRepository.create(
        persistenceData,
      );

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async findById(
    id: string,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await this.baseRepository.findById(id);

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async findOne(
    filter: Partial<CompanyRequest>,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await this.baseRepository.findOne(
        filter as Partial<CompanyRequestDocument>,
      );

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async findAll(
    filter?: Partial<CompanyRequest>,
    sort?: Record<string, 1 | -1>,
  ): Promise<CompanyRequest[]> {
    const companyRequestDocuments =
      await this.baseRepository.findAll(
        filter as Partial<CompanyRequestDocument>,
        sort,
      );

    return companyRequestDocuments.map(
      (document) =>
        CompanyRequestMapper.toDomain(
          document,
        ),
    );
  }

  async update(
    filter: Partial<CompanyRequest>,
    data: Partial<CompanyRequest>,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await this.baseRepository.update(
        filter as Partial<CompanyRequestDocument>,
        data as Partial<CompanyRequestDocument>,
      );

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  // -------------------------
  // CompanyRequest-specific
  // -------------------------

  async findByPhone(
    phone: string,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await CompanyRequestModel.findOne({
        phone,
      })
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async findByEmail(
    email: string,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await CompanyRequestModel.findOne({
        companyEmail: email,
      })
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async findByAccountId(
    accountId: string,
  ): Promise<CompanyRequest | null> {
    const companyRequestDocument =
      await CompanyRequestModel.findOne({
        accountId,
      })
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async updateStatus(
    id: string,
    status: CompanyRequestStatus,
    reviewedBy: string | null,
    reviewedAt: Date | null,
    reviewRemarks: string | null,
    rejectionReason: string | null,
  ): Promise<CompanyRequest> {
    const companyRequestDocument =
      await CompanyRequestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
            reviewedBy,
            reviewedAt,
            reviewRemarks,
            rejectionReason,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async updateInfo(
    id: string,
    data: UpdateCompanyRequestData,
  ): Promise<CompanyRequest> {
    const companyRequestDocument =
      await CompanyRequestModel.findByIdAndUpdate(
        id,
        {
          $set: data,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async updateLocation(
    id: string,
    location: CompanyLocation,
  ): Promise<CompanyRequest> {
    const companyRequestDocument =
      await CompanyRequestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            location,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }

  async updateDocuments(
    id: string,
    documents: CompanyDocument[],
  ): Promise<CompanyRequest> {
    const companyRequestDocument =
      await CompanyRequestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            documents,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
        .lean<CompanyRequestDocument>()
        .exec();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument,
    );
  }
}