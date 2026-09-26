import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan";

import { CreateSubscriptionPlanDTO } from "../validator/CreateSubscriptionPlanValidator";

export interface IUpdateSubscriptionPlan{
    execute(id:string,data:CreateSubscriptionPlanDTO):Promise<SubscriptionPlan>
}