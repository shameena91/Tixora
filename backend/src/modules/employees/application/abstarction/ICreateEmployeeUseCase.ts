import {
  CreateEmployeeDTO,
  EmployeeResponseDTO,
} from "../dtos/EmployeesDtos";

export interface ICreateEmployeeUseCase {
execute(
  dto: CreateEmployeeDTO,
  invitedByAccountId: string,
): Promise<EmployeeResponseDTO>;
}