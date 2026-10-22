export enum CategoryStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class Category {
  constructor(
    public readonly id: string,
    public readonly departmentId: string,
    public name: string,
    public description: string | null,
    public status: CategoryStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}