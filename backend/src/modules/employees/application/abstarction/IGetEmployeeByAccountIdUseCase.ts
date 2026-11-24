
import { EmployeeLoginDetails } from "../dtos/EmployeeLoginDetails";


export interface IGetEmployeeByAccountIdUseCase {
  execute(accountId: string): Promise<EmployeeLoginDetails | null>;
}