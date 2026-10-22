import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";

import { CategoryCreateData } from "../../application/mappers/CategoryMapper";
import type { Category } from "../entities/Category";



export interface ICategoryRepository
  extends IBaseRepository<Category, CategoryCreateData> {
  findByName(
    departmentId: string,
    name: string,
  ): Promise<Category | null>;


   findAllPaginated(
    page: number,
    limit: number,
      departmentId?: string,
  ):Promise<{
    data: Category[];
    total: number;
  }>
 
}