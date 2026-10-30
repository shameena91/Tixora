import type {  RoleStatus } from "../../domain/entities/Role";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";

export interface IUpdateRoleStatus {
  execute(
    id: string,
    roleStatus: RoleStatus,
  ): Promise<RoleResponseDTO>;
}