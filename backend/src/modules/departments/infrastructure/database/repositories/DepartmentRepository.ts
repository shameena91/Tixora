
import type { Connection, Model } from "mongoose";

import { Department } from "../../../domain/entities/department";
import type { IDepartmentRepository } from "../../../domain/repositories/IDepartmentRepository";

import {
  type DepartmentDocument,
  getDepartmentModel,
} from "../modals/DepartmentModal";

import {
  type DepartmentCreateData,
  DepartmentMapper,
} from "../../../application/mappers/DepartmentMapper";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

export class DepartmentRepository
  implements IDepartmentRepository
{
  private readonly _baseRepository: BaseRepository<
    DepartmentDocument,
    DepartmentCreateData
  >;

  private readonly _departmentModel: Model<DepartmentDocument>;

  constructor(tenantConnection: Connection) {
    this._departmentModel = getDepartmentModel(tenantConnection);

    this._baseRepository = new BaseRepository<
      DepartmentDocument,
      DepartmentCreateData
    >(this._departmentModel);
  }

  async create(data: DepartmentCreateData): Promise<Department> {
    const document = await this._baseRepository.create(data);
    return DepartmentMapper.toDomain(document);
  }

  async findById(id: string): Promise<Department | null> {
    const document = await this._baseRepository.findById(id);

    return document ? DepartmentMapper.toDomain(document) : null;
  }

  async findOne(
    filter: Partial<Department>,
  ): Promise<Department | null> {
    const document = await this._baseRepository.findOne(
      filter as Partial<DepartmentDocument>,
    );

    return document ? DepartmentMapper.toDomain(document) : null;
  }

  async findByName(name: string): Promise<Department | null> {

     const escapedName = name
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const document = await this._baseRepository.findOne(
    {
      name: {
        $regex: `^${escapedName}$`,
        $options: "i",
      },
    } as unknown as Partial<DepartmentDocument>,
  );

    return document ? DepartmentMapper.toDomain(document) : null;
  }

  async findByCode(code: string): Promise<Department | null> {
    const document = await this._baseRepository.findOne({
      code: code.trim().toUpperCase(),
    });

    return document ? DepartmentMapper.toDomain(document) : null;
  }

  // async findAllBySearch(search?: string): Promise<Department[]> {
  //   const filter = search?.trim()
  //     ? {
  //         name: {
  //           $regex: search.trim(),
  //           $options: "i",
  //         },
  //       }
  //     : {};

  //   const documents = await this._departmentModel
  //     .find(filter)
  //     .sort({ createdAt: -1 })
  //     .lean<DepartmentDocument[]>()
  //     .exec();

  //   return documents.map((document) =>
  //     DepartmentMapper.toDomain(document),
  //   );
  // }

  async findAll(
    filter: Partial<Department> = {},
    sort?: Record<string, 1 | -1>,
  ): Promise<Department[]> {
    const documents = await this._baseRepository.findAll(
      filter as Partial<DepartmentDocument>,
      sort,
    );

    return documents.map((document) =>
      DepartmentMapper.toDomain(document),
    );
  }
async findAllPaginated(
  page: number,
  limit: number,
): Promise<{
  data: Department[];
  total: number;
}> {
  const skip = (page - 1) * limit;

  const [documents, total] = await Promise.all([
    this._departmentModel
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<DepartmentDocument[]>()
      .exec(),

    this._departmentModel.countDocuments({}).exec(),
  ]);

  return {
    data: documents.map((document) =>
      DepartmentMapper.toDomain(document),
    ),
    total,
  };
}

async updateStatus(
  id: string,
  status: "ACTIVE" | "INACTIVE",
): Promise<Department | null> {
  const document = await this._departmentModel
    .findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    )
    .exec();

  return document
    ? DepartmentMapper.toDomain(document)
    : null;
}

  async update(
  filter: Partial<Department>,
  data: Partial<Department>,
): Promise<Department | null> {
  const { id, ...otherFilters } = filter;

  const repositoryFilter = {
    ...otherFilters,
    ...(id ? { _id: id } : {}),
  };

  const document = await this._baseRepository.update(
    repositoryFilter as Partial<DepartmentDocument>,
    data as Partial<DepartmentDocument>,
  );

  return document
    ? DepartmentMapper.toDomain(document)
    : null;
}
}

