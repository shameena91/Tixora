import { PaymentStatus } from "../types/PaymentStatus";

export enum PaymentMethod {
  CARD = "CARD",
  NETBANKING = "NETBANKING",
  WALLET = "WALLET",
}

export interface Payment {
  id: string;
  paymentId: string;

  companyId: string;
  subscriptionId: string |null;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  razorpayPaymentId: string | null;

  status: PaymentStatus;
 paymentMethod: PaymentMethod | null;
paymentDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}