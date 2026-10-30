import { CreateRole } from "../usecases/CreateRole";
import { GetAllRoles } from "../usecases/GetAllRoles";

import { GetRoleDetails } from "../usecases/GetRoleDetails";
import { UpdateRole } from "../usecases/UpdateRole";
import { UpdateRoleStatus } from "../usecases/UpdateRoleStatus";



export interface IRoleUseCaseFactory {
  createForAccount(accountId: string): Promise<{
    createRole: CreateRole;
    getAllRoles: GetAllRoles;
    updateRole: UpdateRole;
    updateRoleStatus: UpdateRoleStatus;
    getRoleDetails: GetRoleDetails;
  } | null>;
}