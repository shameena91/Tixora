import { EmployeeResponseDTO, UpdateEmployeeDTO } from "../dtos/EmployeesDtos";

export interface IUpdateEmployee{
    execute(employeeId: string,
        dto: UpdateEmployeeDTO,
      ): Promise<EmployeeResponseDTO> 

}