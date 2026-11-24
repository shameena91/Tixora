
import { EmployeeResponseDTO } from "../dtos/EmployeesDtos";

export interface IGetAllEmployeesUseCase {
  execute(
    page?: number,
    limit?: number,
    search?: string|null,
    departmentId?:string,
    categoryId?:string,
      excludeCategoryId?: string
  ): Promise<{
    data: EmployeeResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}