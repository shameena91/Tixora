export interface IBaseRepository<T, CreateData = T> {
  create(data: CreateData): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
}