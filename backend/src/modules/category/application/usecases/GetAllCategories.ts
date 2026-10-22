import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";

import type {
  CategoriesPaginationResponseDto,
  CategoryResponseDto,
} from "../dtos/CategoryDto";



import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IGetAllCategories } from "../abstraction/IGetAllCategories";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";



export class GetAllCategories implements IGetAllCategories {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
      departmentId: string | undefined,
    page: number,
    limit: number,
  ): Promise<CategoriesPaginationResponseDto> {
   if (departmentId) {
    const department =
      await this._departmentRepository.findById(departmentId);

    if (!department) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NOT_FOUND,
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }
  }

    const result =
      await this._categoryRepository.findAllPaginated(
        page,
        limit,
        departmentId
      );
 const data: CategoryResponseDto[] = result.data.map(
      (category) => ({
       id:category.id,
         departmentId:category.departmentId,
        name:category.name,
       
        description:category.description,
        status:category.status,
         createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      }),
    );

    return {
      data,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}