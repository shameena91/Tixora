import { CategoryResponseDto, UpdateCategoryDto } from "../dtos/CategoryDto";

  
  export interface IUpdateCategory{
 execute(
    categoryId: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryResponseDto>
  }
  
