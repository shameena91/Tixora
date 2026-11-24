
import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";

import { ICreateSubscription } from "../../abstraction/company-subscription/ICreateSubscription";

import {
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";


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
    isRenewal: boolean,
    isUpgrade: boolean,
  ): Promise<CreateSubscriptionResponseDto> {
  
    if (isRenewal && isUpgrade) {
      throw new AppErrors(
        "A subscription request cannot be both renewal and upgrade.",
        ErrorCode.All_READY_SUBSCRIBED,
      );
    }

  
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const plan =
      await this._subscriptionPlanRepository.findById(planId);

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
     const isFreePlan =
  plan.monthlyPrice === 0 &&
  plan.yearlyPrice === 0;
 
    const subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(company.id);

    const latestSubscription =
      [...subscriptions].sort(
        (a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )[0] ?? null;


    if (isRenewal) {
    
 
      if (isFreePlan) {
        throw new AppErrors(
          MESSAGES.SUBSCRIPTION_PLAN_NOT_ACTIVE,
          ErrorCode.SUBSCRIPTION_PLAN_NOT_ACTIVE,
        );
      }


      if (
        !latestSubscription ||
        latestSubscription.planId !== plan.id ||
        latestSubscription.billingCycle !== billingCycle
      ) {
        throw new AppErrors(
          MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
          ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
        );
      }

      if (
        latestSubscription.status === SubscriptionStatus.PENDING ||
        latestSubscription.status === SubscriptionStatus.CANCELLED
      ) {
        throw new AppErrors(
          MESSAGES.ALL_REDY_SUBSCRIBED,
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }
    } else if (isUpgrade) {
   
      if (
        !latestSubscription ||
        latestSubscription.status !== SubscriptionStatus.ACTIVE
      ) {
        throw new AppErrors(
          "An active subscription is required to upgrade.",
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }

      if (isFreePlan) {
        throw new AppErrors(
          "The FREE plan cannot be selected as an upgrade.",
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }

      if (latestSubscription.planId === plan.id) {
        throw new AppErrors(
          "The selected plan is already your current plan.",
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }

     
      const currentPlan =
        await this._subscriptionPlanRepository.findById(
          latestSubscription.planId,
        );

      if (!currentPlan) {
        throw new AppErrors(
          MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
          ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
        );
      }


      const currentPrice =
        billingCycle === "MONTHLY"
          ? currentPlan.monthlyPrice
          : currentPlan.yearlyPrice;

      const selectedPrice =
        billingCycle === "MONTHLY"
          ? plan.monthlyPrice
          : plan.yearlyPrice;

      if (
        !Number.isFinite(currentPrice) ||
        !Number.isFinite(selectedPrice) ||
        selectedPrice <= currentPrice
      ) {
        throw new AppErrors(
          "Please select a plan with a higher price than your current plan.",
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }
    } else {
   
      if (
        latestSubscription &&
        (
          latestSubscription.status === SubscriptionStatus.ACTIVE ||
          latestSubscription.status === SubscriptionStatus.PENDING
        )
      ) {
        throw new AppErrors(
          MESSAGES.ALL_REDY_SUBSCRIBED,
          ErrorCode.All_READY_SUBSCRIBED,
        );
      }
    }

    if (isFreePlan) {
      if (isRenewal || isUpgrade) {
        throw new AppErrors(
          MESSAGES.SUBSCRIPTION_PLAN_NOT_ACTIVE,
          ErrorCode.SUBSCRIPTION_PLAN_NOT_ACTIVE,
        );
      }

      const now = new Date();

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
      billingCycle === "MONTHLY"
        ? plan.monthlyPrice
        : plan.yearlyPrice;

    if (
      !Number.isFinite(amountInRupees) ||
      amountInRupees <= 0
    ) {
      throw new AppErrors(
        "The selected plan has an invalid price.",
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    const amountInPaise = Math.round(amountInRupees * 100);

  
    const razorpayOrder =
      await this._razorpayOrderService.createOrder(
        amountInPaise,
        `subscription_${company.id}_${Date.now()}`,
        {
          companyId: company.id,
          planId: plan.id,
          billingCycle,
          isRenewal: String(isRenewal),
          isUpgrade: String(isUpgrade),
          ...(
            (isRenewal || isUpgrade) && latestSubscription
              ? { subscriptionId: latestSubscription.id }
              : {}
          ),
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
      paymentMethod: null,
      status: PaymentStatus.PENDING,
      paymentDate: new Date(),
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
