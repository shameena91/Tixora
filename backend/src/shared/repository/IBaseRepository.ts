


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