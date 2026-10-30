import { comapnyRepository } from "../../company/container/container";
import { tenantDatabaseManager } from "../../tenant/container/Container";

import type {
  IRoleUseCaseFactory,
} from "../application/abstraction/IRoleUseCaseFactory";
import { CreateRole } from "../application/usecases/CreateRole";
import { GetAllRoles } from "../application/usecases/GetAllRoles";
import { GetRoleDetails } from "../application/usecases/GetRoleDetails";
import { UpdateRole } from "../application/usecases/UpdateRole";
import { UpdateRoleStatus } from "../application/usecases/UpdateRoleStatus";

import {
  RoleRepositoryFactory,
} from "../infrastructure/database/repositories/RoleRepositoryFactory";


export class RoleUseCaseFactory implements IRoleUseCaseFactory {
  constructor(
    private readonly _roleRepositoryFactory =
      new RoleRepositoryFactory(),
  ) {}

  async createForAccount(accountId: string) {
    const company =
      await comapnyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const databaseName = `tixora_tenant_${company.id}`;

    const tenantConnection =
      await tenantDatabaseManager.connect(databaseName);

    const roleRepository =
      this._roleRepositoryFactory.createRepository(
        tenantConnection,
      );

    return {
      createRole: new CreateRole(roleRepository),

      getAllRoles: new GetAllRoles(roleRepository),

      updateRole: new UpdateRole(roleRepository),

      updateRoleStatus: new UpdateRoleStatus(roleRepository),

      getRoleDetails: new GetRoleDetails(roleRepository),
    };
  }
}