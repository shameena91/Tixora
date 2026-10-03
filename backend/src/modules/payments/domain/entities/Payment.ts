import { PaymentStatus } from "../types/PaymentStatus";

export interface Payment {
  id: string;
  paymentId: string;

  companyId: string;
  subscriptionId: string;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  razorpayPaymentId: string | null;

  status: PaymentStatus;

paymentDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}