import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";
import { CreateSubscriptionPlanDTO } from "../../../presentation/validator/CreateSubscriptionPlanValidator";


export interface ICreateSubscriptionPlan {
  execute(data: CreateSubscriptionPlanDTO): Promise<SubscriptionPlan>;
}
