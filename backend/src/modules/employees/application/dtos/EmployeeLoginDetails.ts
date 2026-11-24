

import { EmployeeStatus } from "../../domain/entities/employee";

export interface EmployeeLoginDetails {
  status: EmployeeStatus;
  employeeRole: string|null;
  permissions:string[]
}