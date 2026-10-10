import type { CreateDepartment } from "../usecases/CreateDepartment";
import type { GetAllDepartment } from "../usecases/GetAllDepartment";
import { GetDepartmentDetails } from "../usecases/GetDepartmentDetails";
import { UpdateDepartmentStatus } from "../usecases/UpdateDepartmentStatus";
import { IUpdateDepartment } from "./IUpdateDepartment";

export interface IDepartmentUseCaseFactory {
  createForAccount(accountId: string): Promise<{
    createDepartment: CreateDepartment;
    getAllDepartment: GetAllDepartment;
    getDepartment:GetDepartmentDetails
    updateDepartmentStatus:UpdateDepartmentStatus
    updateDepartment: IUpdateDepartment;
  } | null>;

  
}