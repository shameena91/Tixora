import type { Role } from "../../domain/entities/Role";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";



export class RoleResponseMapper {
  static toDTO(role: Role): RoleResponseDTO {
    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      isSystemRole: role.isSystemRole,
      status: role.status,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    };
  }

  static toDTOList(roles: Role[]): RoleResponseDTO[] {
    return roles.map((role) => this.toDTO(role));
  }
}