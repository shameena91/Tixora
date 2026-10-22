import type { IInvoiceRepository } from "../../domain/repositories/IInvoiceRepository";
import type { ICreateInvoiceUseCase } from "../abstraction/ICreateInvoiceUseCase";
import type { CreateInvoiceDto } from "../Dtos/CreateInvoiceDto";
import type { InvoiceResponseDto } from "../Dtos/InvoiceResponseDto";
import { IInvoicePdfGenerator } from "../ports/IInvoicePdfGenerator";

export class CreateInvoiceUseCase implements ICreateInvoiceUseCase {
  constructor(
    private readonly _invoiceRepository: IInvoiceRepository,
    private readonly _invoicePdfGenerator: IInvoicePdfGenerator,
  ) {}

  async execute(data: CreateInvoiceDto): Promise<InvoiceResponseDto> {

    const pdfBuffer = await this._invoicePdfGenerator.generate(data);
     void pdfBuffer;
    const invoice = await this._invoiceRepository.createInvoice(data);

    return {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      companyId: invoice.companyId,
      companyName: invoice.companyName,
      planName: invoice.planName,
      billingCycle: invoice.billingCycle,
      amount: invoice.amount,
      currency: invoice.currency,
      paymentDate: invoice.paymentDate,
      paymentMethod: invoice.paymentMethod,
      paymentStatus: invoice.paymentStatus,
      createdAt: invoice.createdAt
    };
  }
}