import type { CategoryStatus } from "../../domain/entities/Category";

export interface CreateCategoryDto {
  name: string;
  description?: string | null;
}

export interface UpdateCategoryDto {
  name: string;
  description?: string | null;
}

export interface CategoryResponseDto {
  id: string;
  departmentId: string;
  name: string;
  description: string | null;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoriesPaginationResponseDto {
  data: CategoryResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// export const toCategoryResponseDto = (
//   category: Category,
// ): CategoryResponseDto => ({
//   id: category.id,
//   departmentId: category.departmentId,
//   name: category.name,
//   description: category.description,
//   status: category.status,
//   createdAt: category.createdAt.toISOString(),
//   updatedAt: category.updatedAt.toISOString(),
// });