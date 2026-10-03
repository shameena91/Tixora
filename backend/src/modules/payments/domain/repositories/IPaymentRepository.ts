import { PaymentCreateData } from "../../application/mappers/PaymentMapper";
import type { Payment } from "../entities/Payment";

export interface IPaymentRepository {
  create(payment: PaymentCreateData): Promise<Payment>;

  findById(id: string): Promise<Payment | null>;

  findByCompanyId(companyId: string): Promise<Payment[]>;

  findBySubscriptionId(
    subscriptionId: string,
  ): Promise<Payment[]>;
}