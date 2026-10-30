import type { IRoleRepository } from "../../domain/repositories/IRoleRepository";
import { IGetAllRoles } from "../abstraction/IGetAllRoles";
import { RoleResponseDTO } from "../dtos/CreateRoleDtos";
import { RoleResponseMapper } from "../mappers/RoleResponseMapper";

export class GetAllRoles implements IGetAllRoles {
  constructor(
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(): Promise<RoleResponseDTO[]> {
     const roles = await this._roleRepository.findAll();
    return  RoleResponseMapper.toDTOList(roles)
  }
}