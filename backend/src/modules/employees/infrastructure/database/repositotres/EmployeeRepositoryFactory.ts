import { Connection } from "mongoose";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { EmployeeRepository } from "./EmployeeRepository";

export class EmployeeRepositoryFactory {
  create(tenantConnection: Connection): IEmployeeRepository {
    return new EmployeeRepository(tenantConnection);
  }
}