export enum EmployeeStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export class Employee {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly employeeId: string,
    public departmentId: string,
    public roleId: string,
    public categoryIds: string[],
    public profilePhoto: string | null,
    public joiningDate: Date,
    public workload: number,
    public status: EmployeeStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public updateDetails(
    departmentId: string,
    roleId: string,
    categoryIds: string[],
    profilePhoto: string | null,
    joiningDate: Date,
  ): void {
    this.departmentId = departmentId;
    this.roleId = roleId;
    this.categoryIds = [...new Set(categoryIds)];
    this.profilePhoto = profilePhoto;
    this.joiningDate = joiningDate;
    this.updatedAt = new Date();
  }

  public updateCategories(categoryIds: string[]): void {
    this.categoryIds = [...new Set(categoryIds)];
    this.updatedAt = new Date();
  }

  public activate(): void {
    this.status = EmployeeStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  public deactivate(): void {
    this.status = EmployeeStatus.INACTIVE;
    this.updatedAt = new Date();
  }

  public updateWorkload(workload: number): void {
    if (workload < 0) {
      throw new Error("Employee workload cannot be negative");
    }

    this.workload = workload;
    this.updatedAt = new Date();
  }
}