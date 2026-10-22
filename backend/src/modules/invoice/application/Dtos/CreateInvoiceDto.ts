export interface CreateInvoiceDto {
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
}