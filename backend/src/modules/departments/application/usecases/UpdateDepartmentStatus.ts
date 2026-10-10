import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import { IUpdateDepartmentStatus } from "../abstarction/IUpdateDepartmentStatus";

export class UpdateDepartmentStatus
  implements IUpdateDepartmentStatus
{
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    departmentId: string,
    status: "ACTIVE" | "INACTIVE",
  ): Promise<void> {
    if (!departmentId?.trim()) {
      throw new AppErrors(
        "Department not found",
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }

   
    const department =
      await this._departmentRepository.updateStatus(
        departmentId,
        status,
      );

    if (!department) {
      throw new AppErrors(
        "Department not found",
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }
  }
}