import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";

import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";

import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";

import { ICreateSubscription } from "../abstraction/ICreateSubscription";

import {
  Subscription,
  SubscriptionStatus,
} from "../../domain/entities/Subscription";

import { SubscriptionCreateData } from "../mappers/SubscriptionMapper";
import { SubscriptionPlanName } from "../../domain/entities/SubscriptionPlan";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../shared/constants/messages";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

export class CreateSubscription implements ICreateSubscription {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,

    private readonly _companyRepository: ICompanyRepository,

    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    accountId: string,
    planId: string,
    billingCycle: Subscription["billingCycle"],
  ): Promise<Subscription> {
    
    const company = await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new Error("Company not found");
    }


    const plan = await this._subscriptionPlanRepository.findById(planId);

    if (!plan) {
      throw new Error("Subscription plan not found");
    }


    if (plan.subscriptionPlanStatus !== "ACTIVE") {
      throw new Error("Selected subscription plan is not active");
    }


    const existingSubscription =
      await this._subscriptionRepository.findByCompanyId(company.id);

    if (
      existingSubscription &&
      (existingSubscription.status === SubscriptionStatus.ACTIVE ||
        existingSubscription.status === SubscriptionStatus.PENDING)
    ) {
      throw new AppErrors(MESSAGES.ALL_REDY_SUBSCRIBED,
        ErrorCode.All_READY_SUBSCRIBED
      );
    }


    const status =
      plan.name === SubscriptionPlanName.FREE
        ? SubscriptionStatus.ACTIVE
        : SubscriptionStatus.PENDING;


    const now = new Date();


    const subscriptionData: SubscriptionCreateData = {
      companyId: company.id,

      planId: plan.id,

      billingCycle,

      status,

      startDate: now,

      endDate: null,
    };

  
    return await this._subscriptionRepository.create(subscriptionData);
  }
}
