import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { RoleStatus } from "../../domain/entities/Role";
import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { ICreateRole } from "../abstraction/ICreateRole";
import { CreateRoleDTO, RoleResponseDTO } from "../dtos/CreateRoleDtos";
import { RoleResponseMapper } from "../mappers/RoleResponseMapper";



export class CreateRole implements ICreateRole {
  constructor(
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(
    data: CreateRoleDTO,
  ): Promise<RoleResponseDTO> {
    const existingRole =
      await this._roleRepository.findByName(data.name);

    if (existingRole) {
      throw new AppErrors(
        MESSAGES.ROLE_ALREADY_EXISTS,
        ErrorCode.ROLE_ALREADY_EXISTS,
      );
    }

const role = await this._roleRepository.create({
  ...data,
  status: RoleStatus.ACTIVE,
});

    return RoleResponseMapper.toDTO(role);
  }
}