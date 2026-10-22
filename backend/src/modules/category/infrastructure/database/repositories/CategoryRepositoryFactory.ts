import type { Connection } from "mongoose";

import { CategoryRepository } from "../repositories/CategoryRepository";
import type { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";

export class CategoryRepositoryFactory {
   create(
    tenantConnection: Connection,
  ): ICategoryRepository {
    return new CategoryRepository(tenantConnection);
  }
}