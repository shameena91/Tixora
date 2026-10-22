import { CategoryStatus } from "../../domain/entities/Category";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";




import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IUpdateCategoryStatus } from "../abstraction/IUpdateCategoryStatus";



export class UpdateCategoryStatus implements IUpdateCategoryStatus {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    categoryId: string,
    status: CategoryStatus,
  ): Promise<void> {
    if (
      status !== CategoryStatus.ACTIVE &&
      status !== CategoryStatus.INACTIVE
    ) {
      throw new AppErrors(
        "Invalid category status",
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

    const updated = await this._categoryRepository.update(
      { id: categoryId },
      { status },
    );

    if (!updated) {
      throw new AppErrors(
        MESSAGES.CATEGORY_NOT_FOUND,
        ErrorCode.CATEGORY_NOT_FOUND,
      );
    }

   
  }
}