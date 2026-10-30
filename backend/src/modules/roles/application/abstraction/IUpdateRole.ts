import type { UpdateRoleData } from "../../domain/repositories/IRoleRepository";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";

export interface IUpdateRole {
  execute(
    id: string,
    data: UpdateRoleData,
  ): Promise<RoleResponseDTO>;
}