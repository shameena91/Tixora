import { GetAllDepartmentResponseDto } from "../dtos/getAllDepartmentDto";

export interface IGetAllDepartment{
    execute(page: number,
    limit: number):Promise<GetAllDepartmentResponseDto>
}