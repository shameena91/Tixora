export interface IRemoveEmployee {
  execute(
    categoryId: string,
    employeeId: string,
  ): Promise<void>;
}