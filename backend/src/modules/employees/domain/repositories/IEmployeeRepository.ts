import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { EmployeeCreateData, EmployeeDocumentData } from "../../application/mappers/EmployeeMapper";
import { Employee, EmployeeStatus } from "../entities/employee";

export interface IEmployeeRepository
  extends IBaseRepository<
    EmployeeDocumentData,
    EmployeeCreateData
  > {
  findByAccountId(
    accountId: string,
  ): Promise<Employee | null>;

  // findByEmployeeId(
  //   employeeId: string,
  // ): Promise<Employee| null>;

    findAllEmployees(
    page: number,
    limit: number,
    accountIds: string[],
    search?: string,
    departmentid?:string,
    categoryId?:string,
     supportAgentRoleId?: string,
  excludeCategoryId?: string
    
  ): Promise<{
    data: EmployeeDocumentData[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

 updateStatus(
  id: string,
  status: EmployeeStatus,
): Promise<boolean>;
    
    findByIds(employeeIds: string[]): Promise<Employee[]>;

assignEmployeesToCategory(
  categoryId: string,
  employeeIds: string[],
): Promise<void>;
removeEmployeeFromCategory(
  categoryId: string,
  employeeId: string,
): Promise<void>;

updateDetails(
  id: string,
  data: Partial<EmployeeCreateData>
): Promise<Employee | null>;

findUnassignedEmployeesForCategory(
  departmentId: string,
  supportAgentRoleId: string,
  categoryId: string
): Promise<Employee[]>;

}