import type { IInvoiceRepository } from "../../domain/repositories/IInvoiceRepository";
import type { IGetInvoiceUseCase } from "../abstraction/IGetInvoiceUseCase";
import type { InvoiceResponseDto } from "../Dtos/InvoiceResponseDto";

export class GetInvoiceUseCase implements IGetInvoiceUseCase {
  constructor(
    private readonly _invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(id: string): Promise<InvoiceResponseDto | null> {
    const invoice = await this._invoiceRepository.find(id);

    if (!invoice) {
      return null;
    }

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