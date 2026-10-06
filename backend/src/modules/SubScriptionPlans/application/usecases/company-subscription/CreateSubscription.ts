import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";

import { ICreateSubscription } from "../../abstraction/company-subscription/ICreateSubscription";

import {
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import { SubscriptionPlanName } from "../../../domain/entities/SubscriptionPlan";

import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { CreateSubscriptionResponseDto } from "../../dto/CreateSubscriptionResponseDto";
import { IRazorpayOrderService } from "../../ports/IRazorpayOrderService";
import { IPaymentRepository } from "../../../../payments/domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../../../payments/domain/types/PaymentStatus";

export class CreateSubscription implements ICreateSubscription {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,

    private readonly _companyRepository: ICompanyRepository,

    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,

    private readonly _razorpayOrderService: IRazorpayOrderService,
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute(
    accountId: string,
    planId: string,
    billingCycle: Subscription["billingCycle"],
  ): Promise<CreateSubscriptionResponseDto> {
    const company = await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const plan = await this._subscriptionPlanRepository.findById(planId);

    if (!plan) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    if (plan.subscriptionPlanStatus !== "ACTIVE") {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_ACTIVE,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_ACTIVE,
      );
    }

    const existingSubscription =
      await this._subscriptionRepository.findByCompanyId(company.id);

    if (
      existingSubscription &&
      (existingSubscription.status === SubscriptionStatus.ACTIVE ||
        existingSubscription.status === SubscriptionStatus.PENDING)
    ) {
      throw new AppErrors(
        MESSAGES.ALL_REDY_SUBSCRIBED,
        ErrorCode.All_READY_SUBSCRIBED,
      );
    }

    const now = new Date();

    if (plan.name === SubscriptionPlanName.FREE) {
      const subscription = new Subscription(
        crypto.randomUUID(),

        company.id,

        plan.id,

        null,

        billingCycle,

        SubscriptionStatus.ACTIVE,

        now,

        null,

        now,

        now,
      );

      const createdSubscription =
        await this._subscriptionRepository.create(subscription);

      return {
        subscriptionId: createdSubscription.id,
        orderId: null,
        amount: 0,
        currency: "INR",
        status: createdSubscription.status,
      };
    }

    const amountInRupees =
      billingCycle === "MONTHLY" ? plan.monthlyPrice : plan.yearlyPrice;

    const amountInPaise = amountInRupees * 100;

    const razorpayOrder = await this._razorpayOrderService.createOrder(
      amountInPaise,
      `subscription_${company.id}_${Date.now()}`,
      {
        companyId: company.id,
        planId: plan.id,
        billingCycle,
      },
    );

    await this._paymentRepository.create({
      companyId: company.id,
      subscriptionId: null,
      planId: plan.id,
      amount: amountInRupees,
      billingCycle,
      razorpayOrderId: razorpayOrder.orderId,
      razorpayPaymentId: null,
      status: PaymentStatus.PENDING,
      paymentDate: null,
    });

    return {
      subscriptionId: null,
      orderId: razorpayOrder.orderId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      status: SubscriptionStatus.PENDING,
    };
  }
}
