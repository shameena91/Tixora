import { CategoryStatus } from "../../domain/entities/Category";

 
 export interface IUpdateCategoryStatus{
 execute(
    categoryId: string,
    status: CategoryStatus,
  ): Promise<void>
 }
 
