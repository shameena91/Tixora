import { Department } from "../../domain/entities/department";
import { DepartmentDocument } from "../../infrastructure/database/modals/DepartmentModal";




export type DepartmentCreateData = Omit<
  DepartmentDocument,
  "_id" | "createdAt" | "updatedAt"
>;

export class DepartmentMapper {
  static toDomain(document: DepartmentDocument): Department {
  return new Department(
    document._id.toString(),
    document.name,
    document.description,
    document.code,
    document.managerId,
    document.status,
    document.createdAt,
    document.updatedAt,
  );
}

  static toPersistence(
    department: Department,
  ): DepartmentCreateData {
    return {
      name: department.name,

      description: department.description,
 code:  department.code,
    managerId:  department. managerId,
      status: department.status,
    };
  }
}