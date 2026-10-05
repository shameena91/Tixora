import { PaymentStatus } from "../../domain/types/PaymentStatus";

export interface GetPaymentHistoryDto {
  razorpayPaymentId: string | null;
  paymentDate: Date | null;
  amount: number;
  status: PaymentStatus;
 paymentId: string;
}