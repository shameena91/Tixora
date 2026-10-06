// import {
//   QueryFilter,
//   UpdateQuery,
// } from "mongoose";

// export interface PaginatedResult<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export interface IBaseRepository<
//   T,
//   CreateData = T,
// > {
//   create(data: CreateData): Promise<T>;

//   findById(
//     id: string,
//   ): Promise<T | null>;

//   findAll(
//     filter?: QueryFilter<T>,
//     sort?: Record<string, 1 | -1>,
//   ): Promise<T[]>;

//   findAllPaginated(
//     filter: QueryFilter<T>,
//     page: number,
//     limit: number,
//     sort?: Record<string, 1 | -1>,
//   ): Promise<PaginatedResult<T>>;

//   findOne(
//     filter: QueryFilter<T>,
//   ): Promise<T | null>;

//   update(
//     filter: QueryFilter<T>,
//     data: UpdateQuery<T>,
//   ): Promise<T | null>;
// }


export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBaseRepository<T, CreateData = T> {
  create(data: CreateData): Promise<T>;

  findById(id: string): Promise<T | null>;

  findOne(filter: Partial<T>): Promise<T | null>;

  findAll(
    filter?: Partial<T>,
    sort?: Record<string, 1 | -1>,
  ): Promise<T[]>;

  update(
    filter: Partial<T>,
    data: Partial<T>,
  ): Promise<T | null>;
}