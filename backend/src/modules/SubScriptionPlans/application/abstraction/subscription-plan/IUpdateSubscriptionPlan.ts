import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";

import { CreateSubscriptionPlanDTO } from "../../../presentation/validator/CreateSubscriptionPlanValidator";

export interface IUpdateSubscriptionPlan {
  execute(
    id: string,
    data: CreateSubscriptionPlanDTO,
  ): Promise<SubscriptionPlan>;
}
