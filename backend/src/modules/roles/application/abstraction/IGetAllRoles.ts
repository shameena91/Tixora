import { RoleResponseDTO } from "../dtos/CreateRoleDtos";

export interface IGetAllRoles {
  execute(): Promise<RoleResponseDTO[]>;
}