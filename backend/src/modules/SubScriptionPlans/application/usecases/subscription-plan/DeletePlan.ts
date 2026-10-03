import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IDeletePlan } from "../../abstraction/subscription-plan/IDeletePlan";

export class DeletePlan implements IDeletePlan{
    constructor(
        private readonly _subscriptionPlanRepository:ISubscriptionPlanRepository
    ){}
    async execute(id:string):Promise<void>{
        const subscriptionPlan=await this._subscriptionPlanRepository.findById(id)
        if(!subscriptionPlan)
        {
            throw new AppErrors(
                MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
                ErrorCode.ACCOUNT_NOT_FOUND
            )
        }
       await this._subscriptionPlanRepository.delete(id) 
    }
}