

import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import {

  RoleStatus,
} from "../../domain/entities/Role";

import type {
  IRoleRepository,
} from "../../domain/repositories/IRoleRepository";
import { IUpdateRoleStatus } from "../abstraction/IUpdateRoleStatus";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";
import { RoleResponseMapper } from "../mappers/RoleResponseMapper";

export class UpdateRoleStatus implements IUpdateRoleStatus{
  constructor(
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(
    id: string,
    roleStatus: RoleStatus,
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

    const updatedRole = await this._roleRepository.updateStatus(
      id,
      roleStatus,
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