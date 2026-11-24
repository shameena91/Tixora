import { UnassignedEmployeeDTO } from "../dtos/UnassignedEmployeeDTO";

export interface IGetUnassignedEmployeesForCategory {
  execute(categoryId: string): Promise<UnassignedEmployeeDTO[]>;
}