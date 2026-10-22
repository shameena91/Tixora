import { CategoryResponseDto, CreateCategoryDto } from "../dtos/CategoryDto";

  export interface ICreateCategory{
  execute(
    departmentId: string,
    data: CreateCategoryDto,
  ): Promise<CategoryResponseDto>
  }
  
