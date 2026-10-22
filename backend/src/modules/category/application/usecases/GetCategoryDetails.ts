
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import type { CategoryResponseDto } from "../dtos/CategoryDto";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IGetCategoryDetails } from "../abstraction/IGetCategoryDetails";

export class GetCategoryDetails implements IGetCategoryDetails {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
  ) {}

  async execute(categoryId: string): Promise<CategoryResponseDto> {
    const category =
      await this._categoryRepository.findById(categoryId);

    if (!category) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NOT_FOUND,
        ErrorCode.CATEGORY_NOT_FOUND,
      );
    }

    return {
      id: category.id,
      departmentId: category.departmentId,
      name: category.name,
      description: category.description,
      status: category.status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
