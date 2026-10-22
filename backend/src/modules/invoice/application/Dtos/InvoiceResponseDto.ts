
export interface InvoiceResponseDto {
  id: string;
  invoiceNumber: string;
  companyId: string;
  
  companyName: string;
  planName: string;
  billingCycle: "MONTHLY" | "YEARLY";
  amount: number;
  currency: "INR";
  paymentDate: Date;
  paymentMethod: string | null;
  paymentStatus: "SUCCESS";
  createdAt: Date;
}



export interface GetAllInvoicesResponseDto {
  invoices: InvoiceResponseDto[];
  total: number;
}
