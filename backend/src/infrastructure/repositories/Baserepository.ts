

import {
  Model,
  QueryFilter,
  UpdateQuery,
} from "mongoose";

import { IBaseRepository } from "../../shared/repository/IBaseRepository";

export class BaseRepository<
  T,
  CreateData = T,
> implements IBaseRepository<T, CreateData> {
  constructor(
    protected readonly model: Model<T>,
  ) {}

  async create(
    data: CreateData,
  ): Promise<T> {
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

  async findOne(
    filter: Partial<T>,
  ): Promise<T | null> {
    return await this.model
      .findOne(
        filter as QueryFilter<T>,
      )
      .lean<T>()
      .exec();
  }

  async findAll(
    filter: Partial<T> = {},
    sort?: Record<string, 1 | -1>,
  ): Promise<T[]> {
    return await this.model
      .find(
        filter as QueryFilter<T>,
      )
      .sort(sort)
      .lean<T[]>()
      .exec();
  }

  async update(
    filter: Partial<T>,
    data: Partial<T>,
  ): Promise<T | null> {
    return await this.model
      .findOneAndUpdate(
        filter as QueryFilter<T>,
        data as UpdateQuery<T>,
        {
          new: true,
        },
      )
      .lean<T>()
      .exec();
  }
}