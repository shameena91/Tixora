import { EmployeeStatus } from "../../domain/entities/employee";

export interface IUpdateEmployeeStatus {
  execute(
    accountId: string,
    status: EmployeeStatus,
  ): Promise<void>;
}