export interface CreatePaymentRequestDto {
  companyId: string;
  subscriptionId: string;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
}

export interface CreatePaymentResponseDto {
  id: string;
  paymentId: string;

  companyId: string;
  subscriptionId: string;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  razorpayPaymentId: string | null;

  status: "PENDING" | "SUCCESS" | "FAILED";

  paymentDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}