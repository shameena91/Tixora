import { PaymentCreateData } from "../../application/mappers/PaymentMapper";
import type { Payment } from "../entities/Payment";
import { PaymentStatus } from "../types/PaymentStatus";

export interface IPaymentRepository {
  create(payment: PaymentCreateData): Promise<Payment>;

  findById(id: string): Promise<Payment | null>;

  findByCompanyId(companyId: string): Promise<Payment[]>;

  findBySubscriptionId(
    subscriptionId: string,
  ): Promise<Payment[]>;

  findByRazorpayOrderId(
    razorpayOrderId: string,
  ): Promise<Payment | null>;

  updatePaymentStatus(
    id: string,
    status: PaymentStatus,
    subscriptionId: string,
    razorpayPaymentId: string,
    paymentDate: Date,
  ): Promise<Payment>;
}