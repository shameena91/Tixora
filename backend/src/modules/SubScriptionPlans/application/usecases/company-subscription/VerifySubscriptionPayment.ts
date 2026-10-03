import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";

import {
  BillingCycle,
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { IVerifySubscriptionPayment } from "../../abstraction/company-subscription/IVerifySubscriptionPayment";


import { VerifySubscriptionPaymentResponseDto } from "../../dto/VerifySubscriptionPaymentResponseDto";

import { IRazorpayOrderService } from "../../ports/IRazorpayOrderService";

export class VerifySubscriptionPayment
  implements IVerifySubscriptionPayment
{
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,

    private readonly _companyRepository: ICompanyRepository,

    private readonly _razorpayOrderService: IRazorpayOrderService,
  ) {}

  async execute(
    accountId: string,
    orderId: string,
    paymentId: string,
    signature: string,
  ): Promise<VerifySubscriptionPaymentResponseDto> {
    // 1. Verify Razorpay payment signature
    const isValid =
      this._razorpayOrderService.verifyPayment(
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

    // 2. Find company
    const company =
      await this._companyRepository.findByAccountId(
        accountId,
      );

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    // 3. Get Razorpay order details
    const razorpayOrder =
      await this._razorpayOrderService.getOrder(
        orderId,
      );

    // 4. Verify that the order belongs to this company
    if (
      razorpayOrder.notes.companyId !==
      company.id
    ) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    // 5. Get plan and billing cycle from Razorpay order
    const planId =
      razorpayOrder.notes.planId;

   const billingCycle =
  razorpayOrder.notes.billingCycle === "MONTHLY"
    ? BillingCycle.MONTHLY
    : BillingCycle.YEARLY;

    // 6. Calculate subscription dates
    const startDate = new Date();

    const endDate = new Date(startDate);

    if (
      billingCycle === BillingCycle.MONTHLY
    ) {
      endDate.setMonth(
        endDate.getMonth() + 1,
      );
    }

    if (
      billingCycle === BillingCycle.YEARLY
    ) {
      endDate.setFullYear(
        endDate.getFullYear() + 1,
      );
    }

    // 7. Create ACTIVE subscription
    const subscription =
      new Subscription(
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
      await this._subscriptionRepository.create(
        subscription,
      );

    // 8. Return subscription details
    return {
      subscriptionId:
        createdSubscription.id,

      orderId,

      billingCycle:
        createdSubscription.billingCycle,

      status:
        createdSubscription.status,

      startDate:
        createdSubscription.startDate,

      endDate:
        createdSubscription.endDate,
    };
  }
}