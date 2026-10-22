import type { GetAllInvoicesResponseDto } from "../Dtos/InvoiceResponseDto";

export interface IGetCompanyInvoicesUseCase {
  execute(accountId: string): Promise<GetAllInvoicesResponseDto>;
}