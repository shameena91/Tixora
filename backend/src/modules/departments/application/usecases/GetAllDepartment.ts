import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import type { IGetAllDepartment } from "../abstarction/IGetAllDepartment";
import type { DepartmentResponseDto, GetAllDepartmentResponseDto } from "../dtos/getAllDepartmentDto";

export class GetAllDepartment implements IGetAllDepartment {
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    page: number,
    limit: number,
  
  ): Promise<GetAllDepartmentResponseDto> {
    const result =
      await this._departmentRepository.findAllPaginated(
        page,
        limit,
       
      );

    const data: DepartmentResponseDto[] = result.data.map(
      (department) => ({
        id: department.id,
        name: department.name,
        code: department.code,
        description: department.description,
        managerId: department.managerId,
        status: department.status,
        createdAt: department.createdAt.toISOString(),
        updatedAt: department.updatedAt.toISOString(),
      }),
    );

    return {
      data,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}