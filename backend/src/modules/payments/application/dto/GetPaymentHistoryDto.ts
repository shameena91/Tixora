import { PaymentMethod } from "../../domain/entities/Payment";
import { PaymentStatus } from "../../domain/types/PaymentStatus";



export interface GetPaymentHistoryDto {
  paymentId: string;
  razorpayPaymentId: string | null;
  paymentDate: Date | null;
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod | null;
}
