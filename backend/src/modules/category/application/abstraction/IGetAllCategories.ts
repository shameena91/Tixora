import { CategoriesPaginationResponseDto } from "../dtos/CategoryDto";

export interface IGetAllCategories{
       execute(
          departmentId: string | undefined,
        page: number,
        limit: number,
      ): Promise<CategoriesPaginationResponseDto>
}