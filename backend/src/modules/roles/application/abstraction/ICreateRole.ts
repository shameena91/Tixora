import type { CreateRoleData } from "../../domain/repositories/IRoleRepository";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";

export interface ICreateRole {
  execute(data: CreateRoleData): Promise<RoleResponseDTO>;
}