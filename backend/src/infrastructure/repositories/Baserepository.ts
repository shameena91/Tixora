import {
  Model,
  QueryFilter,
  UpdateQuery,
} from "mongoose";

import { IBaseRepository } from "../../shared/repository/IBaseRepository";

export class BaseRepository<T, CreateData = T>
  implements IBaseRepository<T, CreateData>
{
  constructor(
    protected readonly model: Model<T>,
  ) {}

  async create(data: CreateData): Promise<T> {
    const document =
      await this.model.create(
        data as Partial<T>,
      );

    return document.toObject() as T;
  }

  async findById(
    id: string,
  ): Promise<T | null> {
    return await this.model
      .findById(id)
      .lean<T>()
      .exec();
  }

 async findAll(
  filter: QueryFilter<T> = {},
  sort?: Record<string, 1 | -1>,
): Promise<T[]> {
  return await this.model
    .find(filter)
    .sort(sort)
    .lean<T[]>()
    .exec();
}

  async findOne(
    filter: QueryFilter<T>,
  ): Promise<T | null> {
    return await this.model
      .findOne(filter)
      .lean<T>()
      .exec();
  }

  async update(
    filter: QueryFilter<T>,
    data: UpdateQuery<T>,
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(
        filter,
        data,
        {
          new: true,
        },
      )
      .lean<T>()
      .exec();
  }
}