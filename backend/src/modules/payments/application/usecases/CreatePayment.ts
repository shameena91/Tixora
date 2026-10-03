import type { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/types/PaymentStatus";
import { ICreatePayment  } from "../abstraction/ICreatePayment";
import type {
  CreatePaymentRequestDto,
  CreatePaymentResponseDto,
} from "../dto/CreatePaymentDto";

export class CreatePayment implements ICreatePayment {
  constructor(
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute(
    data: CreatePaymentRequestDto,
  ): Promise<CreatePaymentResponseDto> {
    const payment =
      await this._paymentRepository.create({
        companyId: data.companyId,
        subscriptionId: data.subscriptionId,
        planId: data.planId,

        amount: data.amount,
        billingCycle: data.billingCycle,

        razorpayOrderId: data.razorpayOrderId,
        razorpayPaymentId: null,

        status: PaymentStatus.PENDING,
        paymentDate: null,
      });

    return {
      id: payment.id,
      paymentId: payment.paymentId,

      companyId: payment.companyId,
      subscriptionId: payment.subscriptionId,
      planId: payment.planId,

      amount: payment.amount,
      billingCycle: payment.billingCycle,

      razorpayOrderId: payment.razorpayOrderId,
      razorpayPaymentId:
        payment.razorpayPaymentId,

      status: payment.status,
      paymentDate: payment.paymentDate,

      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}