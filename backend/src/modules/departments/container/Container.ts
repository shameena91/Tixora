import { DepartmentController } from "../presentation/controllers/DepartmentController";
import { DepartmentUseCaseFactory } from "./DepartmentUseCaseFactory";

const departmentUseCaseFactory =
  new DepartmentUseCaseFactory();

export const departmentController =
  new DepartmentController(departmentUseCaseFactory);