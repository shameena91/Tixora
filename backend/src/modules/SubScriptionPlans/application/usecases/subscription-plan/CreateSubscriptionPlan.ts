import { randomUUID } from "crypto";
import {
  SubscriptionPlan,
  SubscriptionPlanStatus,
} from "../../../domain/entities/SubscriptionPlan";

import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";

import { CreateSubscriptionPlanDTO } from "../../../presentation/validator/CreateSubscriptionPlanValidator";
import { ICreateSubscriptionPlan } from "../../abstraction/subscription-plan/ICreateSubscriptionPlan";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

export class CreateSubscriptionPlan implements ICreateSubscriptionPlan {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan> {
    console.log("existingPlan", data.name);
    const existingPlan = await this._subscriptionPlanRepository.findByNameAndStatus(
      data.name,
       SubscriptionPlanStatus.ACTIVE,
    );
    console.log("existingPlan", existingPlan);
    if (existingPlan) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_ALREADY_EXISTS,
        ErrorCode.SUBSCRIPTION_PLAN_ALREADY_EXISTS,
      );
    }

    const subscriptionPlan = new SubscriptionPlan(
      randomUUID(),

      data.name,
      data.description,

      data.monthlyPrice,
      data.yearlyPrice,

      data.memberLimit,
      data.companyAdminLimit,
      data.departmentLimit,
      data.ticketLimit,

      data.automaticTicketAssignment,
      data.slaManagement,

      SubscriptionPlanStatus.ACTIVE,

      new Date(),
      new Date(),
    );

    return await this._subscriptionPlanRepository.create(subscriptionPlan);
  }
}
