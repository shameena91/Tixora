import { PaymentMethod } from "../../domain/entities/Payment";

export interface CreatePaymentRequestDto {
  companyId: string;
  subscriptionId: string;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  paymentDate:Date
}




export interface CreatePaymentResponseDto {
  id: string;
  paymentId: string;

  companyId: string;
  subscriptionId: string | null;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  razorpayPaymentId: string | null;

  paymentMethod: PaymentMethod | null;

  status: "PENDING" | "SUCCESS" | "FAILED"|"CANCELLED";

  paymentDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}
