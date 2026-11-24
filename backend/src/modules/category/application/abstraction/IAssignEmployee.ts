export interface IAssignEmployee{
  execute(
    categoryId: string,
    employeeIds: string[],
  ): Promise<void>;

}