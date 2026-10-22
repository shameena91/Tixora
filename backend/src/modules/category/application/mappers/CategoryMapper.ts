
import { Category, CategoryStatus } from "../../domain/entities/Category";

export interface CategoryMapperData {
  _id: string;
  departmentId: string;
  name: string;
  description: string | null;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryCreateData = Omit<
  CategoryMapperData,
  "_id" | "createdAt" | "updatedAt"
>;

export class CategoryMapper {
  static toDomain(document: CategoryMapperData): Category {
    return new Category(
      document._id,
      document.departmentId,
      document.name,
      document.description ?? null,
      document.status,
      document.createdAt,
      document.updatedAt,
    );
  }

  static toPersistence(category: Category): CategoryCreateData {
    return {
      name: category.name,
      description: category.description,
      departmentId: category.departmentId,
      status: category.status,
    };
  }
}
