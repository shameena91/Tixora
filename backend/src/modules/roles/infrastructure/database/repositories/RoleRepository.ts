import {
  Types,
  type Connection,
  type Model,
} from "mongoose";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import { Role, RoleStatus } from "../../../domain/entities/Role";

import type {
  IRoleRepository,
  CreateRoleData,
  UpdateRoleData,
} from "../../../domain/repositories/IRoleRepository";

import {
  type RoleDocument,
  getRoleModel,
} from "../models/Rolemodel"

import {
  type RoleCreateData,
  RoleMapper,
} from "../../../application/mappers/RoleMapper";

export class RoleRepository implements IRoleRepository {
  private readonly _baseRepository: BaseRepository<
    RoleDocument,
    RoleCreateData
  >;

  private readonly _roleModel: Model<RoleDocument>;

  constructor(tenantConnection: Connection) {
    this._roleModel = getRoleModel(tenantConnection);

    this._baseRepository = new BaseRepository<
      RoleDocument,
      RoleCreateData
    >(this._roleModel);
  }

  async create(data: CreateRoleData): Promise<Role> {
    const document = await this._baseRepository.create({
      name: data.name.trim(),
      description: data.description.trim(),
      permissions: [...new Set(data.permissions)],
      isSystemRole: false,
       status: data.status,
    });

    return RoleMapper.toDomain(document);
  }


  async findAll(): Promise<Role[]> {
    const documents = await this._baseRepository.findAll(
      {},
      { createdAt: -1 },
    );

    return documents.map((document) =>
      RoleMapper.toDomain(document),
    );
  }

  
  async findById(id: string): Promise<Role | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this._baseRepository.findById(id);

    return document
      ? RoleMapper.toDomain(document)
      : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const document = await this._baseRepository.findOne({
      name: name.trim(),
    });

    return document
      ? RoleMapper.toDomain(document)
      : null;
  }

  

  async update(
    id: string,
    data: UpdateRoleData,
  ): Promise<Role | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }

    const role = await this.findById(id);

    if (!role) {
      return null;
    }

    role.updateDetails(
      data.name ?? role.name,
      data.description ?? role.description,
      data.permissions ?? role.permissions,
    );

    const updatedDocument = await this._baseRepository.update(
      { _id: new Types.ObjectId(id) },
      RoleMapper.toPersistence(role),
    );

    return updatedDocument
      ? RoleMapper.toDomain(updatedDocument)
      : null;
  }

 async delete(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) {
    return false;
  }

  const document = await this._roleModel
    .findByIdAndDelete(id)
    .exec();

  return document !== null;
}

async updateStatus(
  id: string,
  roleStatus: RoleStatus,
): Promise<Role | null> {
  if (!Types.ObjectId.isValid(id)) {
    return null;
  }

  const document = await this._baseRepository.update(
    { _id: new Types.ObjectId(id) },
    { roleStatus },
  );

  return document
    ? RoleMapper.toDomain(document)
    : null;
}
}