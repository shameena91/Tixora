import { UpdateDepartmentRequestDto } from "../dtos/EditDepartmentDto";
import type { DepartmentDetailsResponseDto } from "../dtos/GetDepartmentDto";

export interface IUpdateDepartment {
  execute(
    departmentId: string,
    data: UpdateDepartmentRequestDto,
  ): Promise<DepartmentDetailsResponseDto>;
}