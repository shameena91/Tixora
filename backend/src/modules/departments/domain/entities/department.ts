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

 
}