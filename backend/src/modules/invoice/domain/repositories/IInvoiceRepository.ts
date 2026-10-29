import { Invoice } from "../entities/Invoice";
import { InvoiceCreateData } from "../../application/mapper/InvoiceMapper";

export interface IInvoiceRepository {
  createInvoice(data: InvoiceCreateData): Promise<Invoice>;

  find(id: string): Promise<Invoice | null>;

findByCompanyId(
  companyId: string,
  page: number,
  limit: number,
): Promise<Invoice[]>;

countByCompanyId(companyId: string): Promise<number>;
  findByPaymentId(paymentId: string): Promise<Invoice | null>;
  updatePdfKey(
  invoiceId: string,
  pdfKey: string,
): Promise<void>;
}