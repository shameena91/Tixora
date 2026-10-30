import type { Connection } from "mongoose";

import { RoleRepository } from "../repositories/RoleRepository";

import type {
  IRoleRepository,
} from "../../../domain/repositories/IRoleRepository";

export class RoleRepositoryFactory {
  createRepository(
    tenantConnection: Connection,
  ): IRoleRepository {
    return new RoleRepository(tenantConnection);
  }
}