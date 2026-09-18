import { randomUUID } from "crypto";
import {
  SubscriptionPlan,
  SubscriptionPlanStatus,
} from "../../domain/entities/SubscriptionPlan";

import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlan";

import { ICreateSubscriptionPlan } from "../abstraction/ICreateSubscriptionPlan";

import { CreateSubscriptionPlanDTO } from "../validator/CreateSubscriptionPlanValidator";

export class CreateSubscriptionPlan
  implements ICreateSubscriptionPlan
{
  constructor(
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(
    data: CreateSubscriptionPlanDTO
  ): Promise<SubscriptionPlan> {


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
  
      return await this.subscriptionPlanRepository.create(subscriptionPlan);

  
  }
}