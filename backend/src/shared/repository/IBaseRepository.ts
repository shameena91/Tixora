import {
  QueryFilter,
  UpdateQuery,
} from "mongoose";

export interface IBaseRepository<T, CreateData = T> {
  create(data: CreateData): Promise<T>;

  findById(id: string): Promise<T | null>;

  findAll(
    filter?: QueryFilter<T>,
  ): Promise<T[]>;

  findOne(
    filter: QueryFilter<T>,
  ): Promise<T | null>;

  update(
    filter: QueryFilter<T>,
    data: UpdateQuery<T>,
  ): Promise<T | null>;
}