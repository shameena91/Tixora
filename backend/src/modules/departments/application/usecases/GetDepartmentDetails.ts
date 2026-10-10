import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import type { IGetDepartmentDetails } from "../abstarction/IGetDepartmentDetails";
import type { DepartmentDetailsResponseDto } from "../dtos/GetDepartmentDto";

export class GetDepartmentDetails
  implements IGetDepartmentDetails
{
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    departmentId: string,
  ): Promise<DepartmentDetailsResponseDto> {
    if (!departmentId?.trim()) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NOT_FOUND,
        ErrorCode.DEPARTMENT_NOT_FOUND,
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

    return {
      id: department.id,
      name: department.name,
      code: department.code,
      description: department.description,
      managerId: department.managerId,
      status: department.status,
      createdAt: department.createdAt.toISOString(),
      updatedAt: department.updatedAt.toISOString(),
    };
  }
}