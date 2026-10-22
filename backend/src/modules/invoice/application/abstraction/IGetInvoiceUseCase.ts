import type { InvoiceResponseDto } from "../Dtos/InvoiceResponseDto";

export interface IGetInvoiceUseCase {
  execute(id: string): Promise<InvoiceResponseDto | null>;
}