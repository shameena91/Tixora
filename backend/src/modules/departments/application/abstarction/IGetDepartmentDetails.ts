import { DepartmentDetailsResponseDto } from "../dtos/GetDepartmentDto";

export interface IGetDepartmentDetails{
    execute(departmentId:string):Promise<DepartmentDetailsResponseDto>
}