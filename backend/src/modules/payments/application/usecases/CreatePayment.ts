
import type { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/types/PaymentStatus";
import { ICreatePayment } from "../abstraction/ICreatePayment";
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
     console.log("CreatePayment executed");
  const paymentDate = new Date();

  console.log("Generated payment date:", paymentDate);
    const payment = await this._paymentRepository.create({
      companyId: data.companyId,
      subscriptionId: data.subscriptionId,
      planId: data.planId,

      amount: data.amount,
      billingCycle: data.billingCycle,

      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: null,

      paymentMethod: null,

      status: PaymentStatus.PENDING,
      paymentDate
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
      razorpayPaymentId: payment.razorpayPaymentId,

      paymentMethod: payment.paymentMethod,

      status: payment.status,
      paymentDate: payment.paymentDate,

      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
