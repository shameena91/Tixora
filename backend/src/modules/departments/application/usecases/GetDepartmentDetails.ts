
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import type { IGetDepartmentDetails } from "../abstarction/IGetDepartmentDetails";
import type { DepartmentDetailsResponseDto } from "../dtos/GetDepartmentDto";


import type { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { IEmployeeRepository } from "../../../employees/domain/repositories/IEmployeeRepository";

export class GetDepartmentDetails
  implements IGetDepartmentDetails
{
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _accountRepository: IAccountRepository,
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

    let manager = null;

    if (department.managerId) {
      // Fetch Employee from Tenant DB
      const employee = await this._employeeRepository.findByIds([
        department.managerId,
      ]);

      const managerEmployee = employee[0];

      if (managerEmployee) {
        // Fetch Account from Platform DB
        const account = await this._accountRepository.findById(
          managerEmployee.accountId.toString(),
        );

        if (account) {
          manager = {
            id: managerEmployee.id,
            name: `${account.firstName} ${account.lastName}`,
          };
        }
      }
    }

    return {
      id: department.id,
      name: department.name,
      code: department.code,
      description: department.description,
      managerId: department.managerId,
      manager,
      status: department.status,
      createdAt: department.createdAt.toISOString(),
      updatedAt: department.updatedAt.toISOString(),
    };
  }
}
