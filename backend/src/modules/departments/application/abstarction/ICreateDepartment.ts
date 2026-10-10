import { CreateDepartmentRequestDto, CreateDepartmentResponseDto } from "../dtos/CreateDepartmentDto";

export interface ICreateDepartment {
  execute(
    data: CreateDepartmentRequestDto,
  ): Promise<CreateDepartmentResponseDto>;
}