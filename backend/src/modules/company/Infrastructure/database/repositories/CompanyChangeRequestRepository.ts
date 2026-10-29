import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";






import type { CompanyProfileChange } from "../../../domain/entities/CompanyProfileChange";
import type { CompanyDocumentChange } from "../../../domain/entities/CompanyDocumentChange";

import type { ICompanyChangeRequestRepository } from "../../../domain/repositories/ICompanyChangeRequestRepository";
import { CompanyProfileChangeCreateData, CompanyProfileChangeMapper, CompanyProfileChangeMapperData } from "../../../application/mappers/CompanyProfileChangeMapper";
import { CompanyDocumentChangeCreateData, CompanyDocumentChangeMapper, CompanyDocumentChangeMapperData } from "../../../application/mappers/CompanyDocumentChnageMapper";

import type { CompanyChangeRequestDocument } from "../Schemas/CompanyChangeRequestSchema";
import {  CompanyChangeRequestListResult, GetCompanyChangeRequestsDTO } from "../../../application/dto/GetAllCompanyChnageRequestDto";
import { CompanyChangeRequestModel } from "../models/CompanyChangeRequestModel";

type CompanyChangeRequestCreateData =
  | CompanyProfileChangeCreateData
  | CompanyDocumentChangeCreateData;

export class CompanyChangeRequestRepository
  implements ICompanyChangeRequestRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
      CompanyChangeRequestDocument,
      CompanyChangeRequestCreateData
    >,
  ) {}

  async createProfileChange(
    change: CompanyProfileChange,
  ): Promise<CompanyProfileChange> {
    const document = await this._baseRepository.create(
      CompanyProfileChangeMapper.toPersistence(change),
    );

    if (
      document.changeType !== "PROFILE" ||
      !document.profileChanges
    ) {
      throw new Error("Failed to create company profile change");
    }

    const mapperData: CompanyProfileChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyProfileChangeMapper.toDomain(mapperData);
  }

  async createDocumentChange(
    change: CompanyDocumentChange,
  ): Promise<CompanyDocumentChange> {
    const document = await this._baseRepository.create(
      CompanyDocumentChangeMapper.toPersistence(change),
    );

    if (
      document.changeType !== "DOCUMENT" ||
      !document.documentChange
    ) {
      throw new Error("Failed to create company document change");
    }

    const mapperData: CompanyDocumentChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyDocumentChangeMapper.toDomain(mapperData);
  }

  async findProfileByRequestId(
    requestId: string,
  ): Promise<CompanyProfileChange | null> {
    const document = await this._baseRepository.findOne({
      requestId,
      changeType: "PROFILE",
    });

    if (
      !document ||
      document.changeType !== "PROFILE" ||
      !document.profileChanges
    ) {
      return null;
    }

    const mapperData: CompanyProfileChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyProfileChangeMapper.toDomain(mapperData);
  }

  async findDocumentByRequestId(
    requestId: string,
  ): Promise<CompanyDocumentChange | null> {
    const document = await this._baseRepository.findOne({
      requestId,
      changeType: "DOCUMENT",
    });

    if (
      !document ||
      document.changeType !== "DOCUMENT" ||
      !document.documentChange
    ) {
      return null;
    }

    const mapperData: CompanyDocumentChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyDocumentChangeMapper.toDomain(mapperData);
  }

  async updateProfileChange(
    change: CompanyProfileChange,
  ): Promise<CompanyProfileChange | null> {
    const document = await this._baseRepository.update(
      {
        requestId: change.requestId,
        changeType: "PROFILE",
      },
      CompanyProfileChangeMapper.toPersistence(change),
    );

    if (
      !document ||
      document.changeType !== "PROFILE" ||
      !document.profileChanges
    ) {
      return null;
    }

    const mapperData: CompanyProfileChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyProfileChangeMapper.toDomain(mapperData);
  }

  async updateDocumentChange(
    change: CompanyDocumentChange,
  ): Promise<CompanyDocumentChange | null> {
    const document = await this._baseRepository.update(
      {
        requestId: change.requestId,
        changeType: "DOCUMENT",
      },
      CompanyDocumentChangeMapper.toPersistence(change),
    );

    if (
      !document ||
      document.changeType !== "DOCUMENT" ||
      !document.documentChange
    ) {
      return null;
    }

    const mapperData: CompanyDocumentChangeMapperData = {
      ...document,
      _id: String(document._id),
    };

    return CompanyDocumentChangeMapper.toDomain(mapperData);
  }




async findAllChangeRequests(
  filters: GetCompanyChangeRequestsDTO,
): Promise<CompanyChangeRequestListResult> {
  const page = Math.max(1, filters.page);
  const limit = Math.min(100, Math.max(1, filters.limit));
  const skip = (page - 1) * limit;
  const search = filters.search?.trim();

  const filter: Record<string, unknown> = {};

  if (filters.status) {
    filter.status = filters.status;
  }

  if (filters.changeType) {
    filter.changeType = filters.changeType;
  }

  if (search) {
    filter.$or = [
      {
        requestId: {
          $regex: search,
          $options: "i",
        },
      },
      {
        companyId: {
          $regex: search,
          $options: "i",
        },
      },
      {
        accountId: {
          $regex: search,
          $options: "i",
        },
      },
      {
        "profileChanges.field": {
          $regex: search,
          $options: "i",
        },
      },
      {
        "profileChanges.newValue": {
          $regex: search,
          $options: "i",
        },
      },
      {
        "documentChange.documentType": {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const [documents, total] = await Promise.all([
    CompanyChangeRequestModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<CompanyChangeRequestDocument[]>()
      .exec(),

    CompanyChangeRequestModel.countDocuments(filter).exec(),
  ]);

  const requests = documents.map((document) => {
    if (document.changeType === "PROFILE") {
      return CompanyProfileChangeMapper.toDomain({
        ...document,
        _id: String(document._id),
      });
    }

    return CompanyDocumentChangeMapper.toDomain({
      ...document,
      _id: String(document._id),
    });
  });

  return {
    requests,
    total,
  };
}

async findByRequestId(
  requestId: string,
): Promise<CompanyProfileChange | CompanyDocumentChange | null> {

  console.log("findByRequestId",  requestId)

  const document = await CompanyChangeRequestModel.findById(
    requestId,
  )
    .lean()
    .exec();
console.log(document)
  if (!document) {
    return null;
  }

  const mapperData = {
    ...document,
    _id: String(document._id),
  };

  if (document.changeType === "PROFILE") {
    return CompanyProfileChangeMapper.toDomain(
      mapperData as Parameters<
        typeof CompanyProfileChangeMapper.toDomain
      >[0],
    );
  }

  if (document.changeType === "DOCUMENT") {
    return CompanyDocumentChangeMapper.toDomain(
      mapperData as Parameters<
        typeof CompanyDocumentChangeMapper.toDomain
      >[0],
    );
  }

  return null;
}
}