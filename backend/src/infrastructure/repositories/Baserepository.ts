import {
  Model,
} from "mongoose";

import { IBaseRepository } from "../../shared/repository/IBaseRepository";

export class BaseRepository<T, CreateData = T>
  implements IBaseRepository<T, CreateData>
{
  constructor(
    protected readonly model: Model<T>
  ) {}

  async create(data: CreateData): Promise<T> {
  const document = await this.model.create(data as Partial<T>);

  return document.toObject() as T;
}

  async findById(id: string): Promise<T | null> {
    return await this.model
      .findById(id)
      .lean<T>()
      .exec();
  }

  async findAll(): Promise<T[]> {
    return await this.model
      .find()
      .lean<T[]>()
      .exec();
  }
}