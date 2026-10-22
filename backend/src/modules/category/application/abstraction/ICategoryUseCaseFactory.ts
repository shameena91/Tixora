
import { ICreateCategory } from "./ICreateCategory";
import { IGetAllCategories } from "./IGetAllCategories";
import { IGetCategoryDetails } from "./IGetCategoryDetails";
import { IUpdateCategory } from "./IUpdateCategory";
import { IUpdateCategoryStatus } from "./IUpdateCategoryStatus";

export interface ICategoryUseCaseFactory {
  createForAccount(accountId: string): Promise<{
    createCategory: ICreateCategory;
    getAllCategories: IGetAllCategories;
    updateCategory: IUpdateCategory;
    updateCategoryStatus: IUpdateCategoryStatus;
    getCategoryDetails:IGetCategoryDetails
  } | null>;
}