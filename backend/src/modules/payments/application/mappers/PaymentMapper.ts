import { Payment } from "../../domain/entities/Payment";
import { PaymentStatus } from "../../domain/types/PaymentStatus";


export interface PaymentDocument {
  _id: string;

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

export interface PaymentCreateData {
  companyId: string;
  subscriptionId: string;
  planId: string;

  amount: number;
  billingCycle: "MONTHLY" | "YEARLY";

  razorpayOrderId: string;
  razorpayPaymentId: string | null;

  status: PaymentStatus;
  paymentDate: Date | null;
}
export interface PaymentDocumentCreateData
  extends PaymentCreateData {
  paymentId: string;
}
export class PaymentMapper {
  static toDomain(
    document: PaymentDocument,
  ): Payment {
    return {
      id: document._id.toString(),
      paymentId: document.paymentId,

      companyId: document.companyId,
      subscriptionId: document.subscriptionId,
      planId: document.planId,

      amount: document.amount,
      billingCycle: document.billingCycle,

      razorpayOrderId: document.razorpayOrderId,
      razorpayPaymentId:
        document.razorpayPaymentId,

      status: document.status,

      paymentDate: document.paymentDate,

      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}