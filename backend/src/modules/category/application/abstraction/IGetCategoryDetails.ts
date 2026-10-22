
import type { CategoryResponseDto } from "../dtos/CategoryDto";

export interface IGetCategoryDetails {
  execute(categoryId: string): Promise<CategoryResponseDto>;
}
