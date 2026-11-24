import { EmployeeResponseDTO } from "../dtos/EmployeesDtos";

export interface IGetEmployeeById{
    execute(employeeId:string):Promise<EmployeeResponseDTO>
}