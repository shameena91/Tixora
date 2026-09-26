import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";
import { IUpdateSubscriptionPlan } from "../abstraction/IUpdateSubscriptionPlan";
import { CreateSubscriptionPlanDTO } from "../validator/CreateSubscriptionPlanValidator";

export class UpdateSubscriptionPlan implements IUpdateSubscriptionPlan{
    constructor(private readonly _subscriptionPlanRepository:ISubscriptionPlanRepository){}

async execute(id:string,data:CreateSubscriptionPlanDTO):Promise<SubscriptionPlan>
{
const subScriptionPlan=await this._subscriptionPlanRepository.findById(id)
if(!subScriptionPlan)
{
    throw new AppErrors(
        MESSAGES.PLAN_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND
    )
}
return this._subscriptionPlanRepository.update(id,data)
}
}