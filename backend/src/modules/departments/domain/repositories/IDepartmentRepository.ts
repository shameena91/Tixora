

import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { Department } from "../entities/department";


export interface IDepartmentRepository extends
 IBaseRepository<Department> {
  findByName(name: string): Promise<Department | null>;
 updateStatus(
  id: string,
  status: "ACTIVE" | "INACTIVE",
): Promise<Department | null>;
  findByCode(code: string): Promise<Department | null>;
  findAllPaginated(
  page: number,
  limit: number,
): Promise<{
  data: Department[];
  total: number;
}>;

countAll(): Promise<number>;
}