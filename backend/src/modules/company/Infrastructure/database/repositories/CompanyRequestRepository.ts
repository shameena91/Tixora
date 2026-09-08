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

import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { UpdateCompanyRequestData } from "../../../domain/types/UpdateCompanyRequesstData";
import { CompanyDocument } from "../../../domain/value-objects/CompanyDocuments";
import { CompanyLocation } from "../../../domain/value-objects/CompanyLocation";

import { CompanyRequestModel } from "../models/CompanyRequestModel";

export class CompanyRequestRepository
  implements ICompanyRequestRepository
{
  private readonly baseRepository: BaseRepository<
  CompanyRequestDocument,
  CompanyRequestCreateData>;

constructor(
  baseRepository: BaseRepository<
    CompanyRequestDocument,
    CompanyRequestCreateData
  >
) {
    this.baseRepository = baseRepository;
  }

  async create(
    companyRequest: CompanyRequest
  ): Promise<CompanyRequest> {

    // Domain → Persistence
    const persistenceData =
      CompanyRequestMapper.toPersistence(companyRequest);

    // Save in database through BaseRepository
    const companyRequestDocument =
      await this.baseRepository.create(persistenceData);

    // Persistence → Domain
    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }






  async findById(
    id: string
  ): Promise<CompanyRequest | null> {

    const companyRequestDocument =
      await this.baseRepository.findById(id);

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }

  async findAll(): Promise<CompanyRequest[]> {

    const companyRequestDocuments =
      await this.baseRepository.findAll();

    return companyRequestDocuments.map(
      CompanyRequestMapper.toDomain
    );
  }

  async findByAccountId(
    accountId: string
  ): Promise<CompanyRequest | null> {

    const companyRequestDocument =
      await CompanyRequestModel
        .findOne({ accountId })
        .lean<CompanyRequestDocument>();

    if (!companyRequestDocument) {
      return null;
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }

  async updateStatus(
    id: string,
    status: CompanyRequestStatus
  ): Promise<CompanyRequest> {

    const companyRequestDocument =
      await CompanyRequestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            status,
            updatedAt: new Date(),
          },
        },
        {
          new: true,
        }
      ).lean<CompanyRequestDocument>();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }

  async updateInfo(
    id: string,
    data: UpdateCompanyRequestData
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
        }
      ).lean<CompanyRequestDocument>();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }

  async updateLocation(
    id: string,
    location: CompanyLocation
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
        }
      ).lean<CompanyRequestDocument>();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }

  async updateDocuments(
    id: string,
    documents: CompanyDocument[]
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
        }
      ).lean<CompanyRequestDocument>();

    if (!companyRequestDocument) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND
      );
    }

    return CompanyRequestMapper.toDomain(
      companyRequestDocument
    );
  }
}