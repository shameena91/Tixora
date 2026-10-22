
import { CreateInvoiceDto } from "../Dtos/CreateInvoiceDto";
import { InvoiceResponseDto } from "../Dtos/InvoiceResponseDto";


export interface ICreateInvoiceUseCase {
  execute(data: CreateInvoiceDto): Promise<InvoiceResponseDto>;
}
