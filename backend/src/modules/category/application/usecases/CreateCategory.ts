import { CategoryStatus } from "../../domain/entities/Category";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";

import type {
  CreateCategoryDto,
  CategoryResponseDto,
} from "../dtos/CategoryDto";



import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { ICreateCategory } from "../abstraction/ICreateCategory";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";



export class CreateCategory implements ICreateCategory {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    departmentId: string,
    data: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const name = data.name?.trim();
    const description = data.description?.trim() || null;

    if (!departmentId?.trim() || !name) {
      throw new AppErrors(
        "Department and category name are required",
        ErrorCode.INVALID_INPUT,
      );
    }

    const department =
      await this._departmentRepository.findById(departmentId);

    if (!department) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NOT_FOUND,
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }

    const duplicate = await this._categoryRepository.findByName(
      departmentId,
      name,
    );

    if (duplicate) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NAME_ALREADY_EXISTS,
        ErrorCode.CATEGORY_ALREADY_EXISTS,
      );
    }

    const category = await this._categoryRepository.create({
      departmentId,
      name,
      description,
      status: CategoryStatus.ACTIVE,
    });

    return {
        id:category.id,
         departmentId:category.departmentId,
        name:category.name,
       
        description:category.description,
        status:category.status,
         createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }
}