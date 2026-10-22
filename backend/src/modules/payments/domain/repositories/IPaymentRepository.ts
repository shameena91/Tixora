


import {
  IBaseRepository,
} from "../../../../shared/repository/IBaseRepository";

import type { Payment, PaymentMethod } from "../entities/Payment";

import { PaymentStatus } from "../types/PaymentStatus";

import {
  PaymentCreateData,
} from "../../application/mappers/PaymentMapper";

export interface IPaymentRepository
  extends IBaseRepository<
    Payment,
    PaymentCreateData
  > {

  findByCompanyId(
    companyId: string,
  ): Promise<Payment[]>;

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
    paymentMethod: PaymentMethod | null
  ): Promise<Payment>;

  updateStatusByRazorpayOrderId(
  razorpayOrderId: string,
  status: PaymentStatus,
): Promise<Payment | null>;
}