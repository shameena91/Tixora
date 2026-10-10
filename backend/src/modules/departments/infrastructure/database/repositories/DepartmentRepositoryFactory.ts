
import type { Connection } from "mongoose";

import type { IDepartmentRepository } from "../../../domain/repositories/IDepartmentRepository";

import { DepartmentRepository } from "./DepartmentRepository";

export class DepartmentRepositoryFactory {
  create(
    tenantConnection: Connection,
  ): IDepartmentRepository {
    return new DepartmentRepository(tenantConnection);
  }
}

