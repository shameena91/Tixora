import { CreateInvoiceDto } from "../Dtos/CreateInvoiceDto";

export interface IInvoicePdfGenerator {
  generate(invoice: CreateInvoiceDto): Promise<Buffer>;
}
