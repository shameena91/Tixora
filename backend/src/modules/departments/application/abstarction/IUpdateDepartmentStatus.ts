import { DepartmentStatus } from "../../domain/entities/department";

export interface IUpdateDepartmentStatus{
    execute(departmentId:string,status:DepartmentStatus):Promise<void>
}