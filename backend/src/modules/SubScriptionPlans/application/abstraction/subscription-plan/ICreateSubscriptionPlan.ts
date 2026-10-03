import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan";
import { CreateSubscriptionPlanDTO } from "../validator/CreateSubscriptionPlanValidator";

export interface ICreateSubscriptionPlan{
    execute(data:CreateSubscriptionPlanDTO):Promise<SubscriptionPlan>
}