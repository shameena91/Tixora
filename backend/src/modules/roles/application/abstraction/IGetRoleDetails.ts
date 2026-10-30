import { RoleResponseDTO } from "../dtos/CreateRoleDtos";

export interface IGetRoleDetails {
  execute(id: string): Promise<RoleResponseDTO>;
}