

import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import type {
  IRoleRepository,
  UpdateRoleData,
} from "../../domain/repositories/IRoleRepository";
import { IUpdateRole } from "../abstraction/IUpdateRole";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";
import { RoleResponseMapper } from "../mappers/RoleResponseMapper";

export class UpdateRole implements IUpdateRole{
  constructor(
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(
    id: string,
    data: UpdateRoleData,
  ): Promise<RoleResponseDTO> {
    const role = await this._roleRepository.findById(id);

    if (!role) {
      throw new AppErrors(
        MESSAGES.ROLE_NOT_FOUND,
        ErrorCode.ROLE_NOT_FOUND,
      );
    }

    if (role.isSystemRole) {
      throw new AppErrors(
        MESSAGES.SYSTEM_ROLE_CANNOT_BE_UPDATED,
        ErrorCode.SYSTEM_ROLE_CANNOT_BE_UPDATED,
      );
    }

    if (data.name) {
      const existingRole = await this._roleRepository.findByName(
        data.name.trim(),
      );

      if (existingRole && existingRole.id !== role.id) {
        throw new AppErrors(
          MESSAGES.ROLE_ALREADY_EXISTS,
          ErrorCode.ROLE_ALREADY_EXISTS,
        );
      }
    }

    const updatedRole = await this._roleRepository.update(
      id,
      data,
    );

    if (!updatedRole) {
      throw new AppErrors(
        MESSAGES.ROLE_NOT_FOUND,
        ErrorCode.ROLE_NOT_FOUND,
      );
    }

      return RoleResponseMapper.toDTO(updatedRole);
  }
}