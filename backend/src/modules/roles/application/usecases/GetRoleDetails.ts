

import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { IGetRoleDetails } from "../abstraction/IGetRoleDetails";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";
import { RoleResponseMapper } from "../mappers/RoleResponseMapper";

export class GetRoleDetails implements IGetRoleDetails{
  constructor(
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(id: string): Promise<RoleResponseDTO> {
    const role = await this._roleRepository.findById(id);

    if (!role) {
      throw new AppErrors(
        MESSAGES.ROLE_NOT_FOUND,
        ErrorCode.ROLE_NOT_FOUND,
      );
    }

    
    return RoleResponseMapper.toDTO(role);
  }
}