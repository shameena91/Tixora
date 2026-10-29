import type { GetAllInvoicesResponseDto } from "../Dtos/InvoiceResponseDto";

export interface IGetCompanyInvoicesUseCase {
  execute(accountId: string,page:number,limit:number): Promise<GetAllInvoicesResponseDto>;
}