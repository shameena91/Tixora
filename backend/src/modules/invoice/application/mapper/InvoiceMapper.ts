
import { Invoice } from "../../domain/entities/Invoice";

export interface InvoiceMapperData {
  _id: string;
  invoiceNumber: string;

  companyId: string;
  paymentId: string;
  subscriptionId: string | null;

  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyRegistrationNumber: string;
  companyAddress: string;

  planName: string;
  billingCycle: "MONTHLY" | "YEARLY";

  amount: number;
  currency: "INR";
  pdfKey: string | null;

  paymentDate: Date;
  paymentMethod: string | null;
  paymentStatus: "SUCCESS";

  createdAt: Date;
  updatedAt: Date;
}

export type InvoiceCreateData = Omit<
  Invoice,
  "id" | "createdAt" | "updatedAt"
>;

export class InvoiceMapper {
  static toEntity(document: InvoiceMapperData): Invoice {
    return {
      id: document._id,
      invoiceNumber: document.invoiceNumber,

      companyId: document.companyId,
      paymentId: document.paymentId,
      subscriptionId: document.subscriptionId,

      companyName: document.companyName,
      companyEmail: document.companyEmail,
      companyPhone: document.companyPhone,
      companyRegistrationNumber: document.companyRegistrationNumber,
      companyAddress: document.companyAddress,

      planName: document.planName,
      billingCycle: document.billingCycle,

      amount: document.amount,
      currency: document.currency,
      pdfKey: document.pdfKey,

      paymentDate: document.paymentDate,
      paymentMethod: document.paymentMethod,
      paymentStatus: document.paymentStatus,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }

  static toPersistence(
    invoice: InvoiceCreateData,
  ): InvoiceCreateData {
    return {
      invoiceNumber: invoice.invoiceNumber,

      companyId: invoice.companyId,
      paymentId: invoice.paymentId,
      subscriptionId: invoice.subscriptionId,

      companyName: invoice.companyName,
      companyEmail: invoice.companyEmail,
      companyPhone: invoice.companyPhone,
      companyRegistrationNumber: invoice.companyRegistrationNumber,
      companyAddress: invoice.companyAddress,

      planName: invoice.planName,
      billingCycle: invoice.billingCycle,

      amount: invoice.amount,
      currency: invoice.currency,
      pdfKey: invoice.pdfKey,

      paymentDate: invoice.paymentDate,
      paymentMethod: invoice.paymentMethod,
      paymentStatus: invoice.paymentStatus,
    };
  }
}
