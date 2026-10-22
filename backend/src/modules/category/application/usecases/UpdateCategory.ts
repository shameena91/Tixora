import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";

import type {
  UpdateCategoryDto,
  CategoryResponseDto,
} from "../dtos/CategoryDto";


import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IUpdateCategory } from "../abstraction/IUpdateCategory";


export class UpdateCategory implements IUpdateCategory {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    categoryId: string,
    data: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const name = data.name?.trim();
    const description = data.description?.trim() || null;

    if (!categoryId?.trim() || !name) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NAME_REQUIRED,
        ErrorCode.INVALID_INPUT,
      );
    }

    const existing = await this._categoryRepository.findById(
      categoryId,
    );

    if (!existing) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NOT_FOUND,
        ErrorCode.CATEGORY_NOT_FOUND,
      );
    }

    const duplicate = await this._categoryRepository.findByName(
      existing.departmentId,
      name,
    );

    if (duplicate && duplicate.id !== existing.id) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NAME_ALREADY_EXISTS,
        ErrorCode.CATEGORY_ALREADY_EXISTS,
      );
    }

    const updated = await this._categoryRepository.update(
      { id: categoryId },
      { name, description },
    );

    if (!updated) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NOT_FOUND,
        ErrorCode.CATEGORY_NOT_FOUND,
      );
    }

   
    return {
        id:updated.id,
         departmentId:updated.departmentId,
        name:updated.name,
       
        description:updated.description,
        status:updated.status,
         createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    }
  }
}