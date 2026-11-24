import type { Connection, Model, QueryFilter } from "mongoose";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import {
  EmployeeMapper,
  type EmployeeCreateData,
  type EmployeeDocumentData,
} from "../../../application/mappers/EmployeeMapper";

import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { createEmployeeModel } from "../modals/EmployeeModel";
import { Employee, EmployeeStatus } from "../../../domain/entities/employee";



export class EmployeeRepository
  extends BaseRepository<
    EmployeeDocumentData,
    EmployeeCreateData
  >
  implements IEmployeeRepository
{
  private readonly _employeeModel: Model<EmployeeDocumentData>;

  constructor(tenantConnection: Connection) {
    const employeeModel =
      createEmployeeModel(tenantConnection);

    super(employeeModel);

    this._employeeModel = employeeModel;
  }

async findByAccountId(
  accountId: string,
): Promise<Employee | null> {
  const document = await this.findOne({ accountId });

  return document
    ? EmployeeMapper.toDomain(document)
    : null;
}
async findAllEmployees(
  page: number,
  limit: number,
 accountIds: string[] = [],
  search?: string,
  departmentId?:string,
  categoryId?:string,
    supportAgentRoleId?: string,
  excludeCategoryId?: string

) {
  const skip = (page - 1) * limit;
  const trimmedSearch = search?.trim();

  const filter: QueryFilter<EmployeeDocumentData> = {};
console.log("Search value:", trimmedSearch);
console.log("departmentId", departmentId);
  if (trimmedSearch) {
    filter.$or = [
      {
        employeeId: {
          $regex: trimmedSearch,
          $options: "i",
        },
      },
      {
        accountId: {
          $in: accountIds,
        },
      },
    ];
  
  }

  if (supportAgentRoleId) {
  filter.roleId = supportAgentRoleId;
}

if (excludeCategoryId) {
  filter.categoryIds = { $nin: [excludeCategoryId] };
}
   if (departmentId) {
    filter.departmentId = departmentId;
     filter.status = EmployeeStatus.ACTIVE;
  }
  if (categoryId) {
  filter.categoryIds = categoryId;
  filter.status = EmployeeStatus.ACTIVE;
}

  const [data, total] = await Promise.all([
    this._employeeModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean<EmployeeDocumentData[]>()
      .exec(),

    this._employeeModel.countDocuments(filter).exec(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}



async updateStatus(
  id: string,
  status: EmployeeStatus,
): Promise<boolean> {
  const updatedEmployee = await this._employeeModel.findOneAndUpdate(
    { accountId: id },
    {
      $set: {
        status,
        updatedAt: new Date(),
      },
    },
    { new: true },
  ).exec();

  return !!updatedEmployee;
}
async assignEmployeesToCategory(
  categoryId: string,
  employeeIds: string[],
): Promise<void> {
  await this._employeeModel.updateMany(
    {
      _id: { $in: employeeIds },
    },
    {
      $addToSet: {
        categoryIds: categoryId,
      },
    },
  );
}

async removeEmployeeFromCategory(
  categoryId: string,
  employeeId: string,
): Promise<void> {
  await this._employeeModel.updateOne(
    {
      _id: employeeId,
      categoryIds: categoryId,
    },
    {
      $pull: {
        categoryIds: categoryId,
      },
    },
  );
}
async findByIds(employeeIds: string[]): Promise<Employee[]> {
  const employees = await this._employeeModel.find({
    _id: { $in: employeeIds },
  });

  return employees.map((employee) =>
    EmployeeMapper.toDomain(employee),
  );
}


async updateDetails(
  id: string,
   data: Partial<EmployeeCreateData>,
): Promise<Employee | null> {
  const document = await super.update(
    { _id: id } as Partial<EmployeeDocumentData>,
    data as Partial<EmployeeDocumentData>,
  );

  return document
    ? EmployeeMapper.toDomain(document)
    : null;
}
async findUnassignedEmployeesForCategory(
  departmentId: string,
  supportAgentRoleId: string,
  categoryId: string
): Promise<Employee[]> {
  const employees = await this.model.find({
    departmentId,
    roleId: supportAgentRoleId,
    status: EmployeeStatus.ACTIVE,
    categoryIds: { $ne: categoryId }
  });

  return employees.map((employee) =>
    EmployeeMapper.toDomain(employee)
  );
}
}