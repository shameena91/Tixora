import { Types, type Connection, type Model } from "mongoose";

import { Category } from "../../../domain/entities/Category";
import type { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";

import {
  type CategoryDocument,
  getCategoryModel,
} from "../models/CategoryModel";

import {
  type CategoryCreateData,
  CategoryMapper,
} from "../../../application/mappers/CategoryMapper";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

export class CategoryRepository implements ICategoryRepository {
  private readonly _baseRepository: BaseRepository<
    CategoryDocument,
    CategoryCreateData
  >;

  private readonly _categoryModel: Model<CategoryDocument>;

  constructor(tenantConnection: Connection) {
    this._categoryModel = getCategoryModel(tenantConnection);

    this._baseRepository = new BaseRepository<
      CategoryDocument,
      CategoryCreateData
    >(this._categoryModel);
  }

  async create(data: CategoryCreateData): Promise<Category> {
    const document = await this._baseRepository.create(data);

    return CategoryMapper.toDomain(document);
  }

  async findById(id: string): Promise<Category | null> {
    const document = await this._baseRepository.findById(id);

    return document ? CategoryMapper.toDomain(document) : null;
  }

  async findOne(
    filter: Partial<Category>,
  ): Promise<Category | null> {
    const document = await this._baseRepository.findOne(
      filter as Partial<CategoryDocument>,
    );

    return document ? CategoryMapper.toDomain(document) : null;
  }

  async findByName(
    departmentId: string,
    name: string,
  ): Promise<Category | null> {
    const escapedName = name
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const document = await this._baseRepository.findOne(
      {
        departmentId: new Types.ObjectId(departmentId),
        name: {
          $regex: `^${escapedName}$`,
          $options: "i",
        },
      } as unknown as Partial<CategoryDocument>,
    );

    return document ? CategoryMapper.toDomain(document) : null;
  }

  async findAll(
    filter: Partial<Category> = {},
    sort?: Record<string, 1 | -1>,
  ): Promise<Category[]> {
    const documents = await this._baseRepository.findAll(
      filter as Partial<CategoryDocument>,
      sort,
    );

    return documents.map((document) =>
      CategoryMapper.toDomain(document),
    );
  }

//   async findAllByDepartmentId(
//     departmentId: string,
//     page: number,
//     limit: number,
//   ): Promise<{
//     data: Category[];
//     total: number;
//   }> {
//     const filter = {
//       departmentId: new Types.ObjectId(departmentId),
//     };

//     const skip = (page - 1) * limit;

//     const [documents, total] = await Promise.all([
//       this._categoryModel
//         .find(filter)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean<CategoryDocument[]>()
//         .exec(),

//       this._categoryModel.countDocuments(filter).exec(),
//     ]);

//     return {
//       data: documents.map((document) =>
//         CategoryMapper.toDomain(document),
//       ),
//       total,
//     };
//   }

  async update(
    filter: Partial<Category>,
    data: Partial<Category>,
  ): Promise<Category | null> {
    const { id, ...otherFilters } = filter;

    const repositoryFilter = {
      ...otherFilters,
      ...(id ? { _id: id } : {}),
    };

    const document = await this._baseRepository.update(
      repositoryFilter as unknown as Partial<CategoryDocument>,
      data as Partial<CategoryDocument>,
    );

    return document
      ? CategoryMapper.toDomain(document)
      : null;
  }

  async findAllPaginated(
    page: number,
    limit: number,
    departmentId?: string,
  ): Promise<{
    data: Category[];
    total: number;
  }> {
    const skip = (page - 1) * limit;

  const filter: { departmentId?: string } = departmentId
  ? { departmentId }
  : {};
  
    const [documents, total] = await Promise.all([
      this._categoryModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<CategoryDocument[]>()
        .exec(),
  
      this._categoryModel.countDocuments(filter).exec(),
    ]);
  
    return {
      data: documents.map((document) =>
        CategoryMapper.toDomain(document),
      ),
      total,
    };
  }
}