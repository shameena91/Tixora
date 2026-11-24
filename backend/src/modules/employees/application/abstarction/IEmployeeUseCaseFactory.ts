import { EmployeeStatus } from "../../domain/entities/employee";
import { ICreateEmployeeUseCase } from "./ICreateEmployeeUseCase";
import { IGetAllEmployeesUseCase } from "./IGetAllEmployeesUseCase";
import { IGetEmployeeByAccountIdUseCase } from "./IGetEmployeeByAccountIdUseCase";
import { IGetEmployeeById } from "./IGetEmployeeById";
import { IGetUnassignedEmployeesForCategory } from "./IGetUnassignedEmployeesForCategory";
import { IUpdateEmployee } from "./IUpdateEmployee";
import { IUpdateEmployeeStatus } from "./IUpdateEmployeeStatus";

export interface IEmployeeUseCaseFactory {
  createForAccount(
    accountId: string,
  ): Promise<{
    createEmployee: ICreateEmployeeUseCase;
     getAllEmployees: IGetAllEmployeesUseCase;
         getEmployeeByAccountId: IGetEmployeeByAccountIdUseCase;
            getEmployeeById: IGetEmployeeById;
    updateEmployee: IUpdateEmployee;
    updateEmployeeStatus: IUpdateEmployeeStatus;
getUnassignedEmployeesForCategory: IGetUnassignedEmployeesForCategory;
       activateInvitedEmployee: (
      accountId: string,
      status: EmployeeStatus
    ) => Promise<boolean>;
    assignDepartmentManager: (
  accountId: string,
) => Promise<void>;
  } | null>;
  
}