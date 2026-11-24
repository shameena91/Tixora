
import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";

import { EmployeeStatus } from "../../domain/entities/employee";
import { AccountStatus } from "../../../auth/domain/entities/Account";

import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IUpdateEmployeeStatus } from "../abstarction/IUpdateEmployeeStatus";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";

export class UpdateEmployeeStatus implements IUpdateEmployeeStatus {
  constructor(
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _accountRepository: IAccountRepository,
      private readonly _departmentRepository: IDepartmentRepository,
      private readonly _roleRepository:IRoleRepository
  ) {}

  async execute(
    accountId: string,
    status: EmployeeStatus,
  ): Promise<void> {
    if (!accountId?.trim()) {
      throw new AppErrors(
        "Account ID is required",
        ErrorCode.NOT_FOUND,
      );
    }
console.log("acccccccccc",accountId)
   
    const employee =
      await this._employeeRepository.findByAccountId(accountId);

    if (!employee) {
      throw new AppErrors(
        "Employee not found",
        ErrorCode.NOT_FOUND,
      );
    }

    const account =
      await this._accountRepository.findById(accountId);

    if (!account) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    
    const accountStatus: AccountStatus = {
      [EmployeeStatus.PENDING]: AccountStatus.PENDING,
      [EmployeeStatus.ACTIVE]: AccountStatus.ACTIVE,
      [EmployeeStatus.INACTIVE]: AccountStatus.INACTIVE,
    }[status];

  
    const isEmployeeUpdated =
      await this._employeeRepository.updateStatus(
        accountId,
        status,
      );

    if (!isEmployeeUpdated) {
      throw new AppErrors(
        "Failed to update employee status",
        ErrorCode.NOT_FOUND,
      );
    }

    try {
     
      await this._accountRepository.updateStatus(
        accountId,
        accountStatus,
      );


if (
  status === EmployeeStatus.INACTIVE
) {
  const department = await this._departmentRepository.findById(
    employee.departmentId.toString(),
  );

  if (
    department?.managerId?.toString() === employee.id.toString()
  ) {
    const isManagerCleared =
      await this._departmentRepository.assignManager(
        employee.departmentId.toString(),
        null,
      );

    if (!isManagerCleared) {
      throw new AppErrors(
        "Failed to remove inactive Department Admin",
        ErrorCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}


const role = await this._roleRepository.findById(
  employee.roleId.toString(),
);

const isDepartmentAdmin =
  role?.name.trim().toUpperCase().replace(/[\s-]+/g, "_") ===
  "DEPARTMENT_ADMIN";

if (
  isDepartmentAdmin &&
  status === EmployeeStatus.ACTIVE
) {
  await this._departmentRepository.assignManager(
    employee.departmentId.toString(),
    employee.id.toString(),
  );
}

    } catch (error) {
     
      const isRestored =
        await this._employeeRepository.updateStatus(
          accountId,
          employee.status,
        );

      if (!isRestored) {
        throw new AppErrors(
          "Account update failed and employee status rollback failed",
          ErrorCode.INTERNAL_SERVER_ERROR,
        );
      }

      throw error;
    }
  }
}
