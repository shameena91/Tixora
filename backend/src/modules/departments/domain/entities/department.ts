export enum DepartmentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class Department {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string | null,
    public code:string,
    public managerId:string|null,
    public status: DepartmentStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public activate(): void {
    this.status = DepartmentStatus.ACTIVE;
    this.updatedAt = new Date();
  }

  public deactivate(): void {
    this.status = DepartmentStatus.INACTIVE;
    this.updatedAt = new Date();
  }
}