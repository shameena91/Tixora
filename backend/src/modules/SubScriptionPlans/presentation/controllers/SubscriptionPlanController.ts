import { Request, Response } from "express";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { ICreateSubscriptionPlan } from "../../application/abstraction/ICreateSubscriptionPlan";
import { createSubscriptionPlanSchema } from "../../application/validator/CreateSubscriptionPlanValidator";
export class SubscriptionPlanController {
constructor(    private readonly createSubscriptionPlan:ICreateSubscriptionPlan,
){}

async createPlan(
    req:Request,
    res:Response
):Promise<void>{
    const data=createSubscriptionPlanSchema.parse(req.body)
    const subscriptionPlan=await this.createSubscriptionPlan.execute(data)

     res.status(HttpStatusCode.OK).json({
          success: true,
          message: MESSAGES.PLAN_CREATED,
          data:subscriptionPlan ,
        });
}

}