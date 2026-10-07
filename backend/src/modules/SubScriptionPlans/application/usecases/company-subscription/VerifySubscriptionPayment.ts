import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { IPaymentRepository } from "../../../../payments/domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../../../payments/domain/types/PaymentStatus";
import { IProvisionTenant } from "../../../../tenant/application/abstractions/IProvisionTenant";

import {
  BillingCycle,
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { IVerifySubscriptionPayment } from "../../abstraction/company-subscription/IVerifySubscriptionPayment";

import { VerifySubscriptionPaymentResponseDto } from "../../dto/VerifySubscriptionPaymentResponseDto";

import { IRazorpayOrderService } from "../../ports/IRazorpayOrderService";

export class VerifySubscriptionPayment implements IVerifySubscriptionPayment {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,

    private readonly _companyRepository: ICompanyRepository,

    private readonly _razorpayOrderService: IRazorpayOrderService,

    private readonly _paymentRepository: IPaymentRepository,
     private readonly _provisionTenant: IProvisionTenant,
  ) {}

  async execute(
    accountId: string,
    orderId: string,
    paymentId: string,
    signature: string,
  ): Promise<VerifySubscriptionPaymentResponseDto> {
    const isValid = this._razorpayOrderService.verifyPayment(
      orderId,
      paymentId,
      signature,
    );

    if (!isValid) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    const company = await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const razorpayOrder = await this._razorpayOrderService.getOrder(orderId);

    if (razorpayOrder.notes.companyId !== company.id) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    const payment =
      await this._paymentRepository.findByRazorpayOrderId(orderId);

    if (!payment) {
      throw new AppErrors(
        MESSAGES.PAYMENT_NOT_FOUND,
        ErrorCode.PAYMENT_NOT_FOUND,
      );
    }
    const planId = razorpayOrder.notes.planId;

    const billingCycle =
      razorpayOrder.notes.billingCycle === "MONTHLY"
        ? BillingCycle.MONTHLY
        : BillingCycle.YEARLY;

    const startDate = new Date();

    const endDate = new Date(startDate);

    if (billingCycle === BillingCycle.MONTHLY) {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    if (billingCycle === BillingCycle.YEARLY) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = new Subscription(
      crypto.randomUUID(),

      company.id,

      planId,

      orderId,

      billingCycle,

      SubscriptionStatus.ACTIVE,

      startDate,

      endDate,

      startDate,

      startDate,
    );
const createdSubscription =
  await this._subscriptionRepository.create(subscription);

await this._provisionTenant.execute(company.id);

    await this._paymentRepository.updatePaymentStatus(
      payment.id,
      PaymentStatus.SUCCESS,
      createdSubscription.id,
      paymentId,
      startDate,
    );
    return {
      subscriptionId: createdSubscription.id,

      orderId,

      billingCycle: createdSubscription.billingCycle,

      status: createdSubscription.status,

      startDate: createdSubscription.startDate,

      endDate: createdSubscription.endDate,
    };
  }
}
