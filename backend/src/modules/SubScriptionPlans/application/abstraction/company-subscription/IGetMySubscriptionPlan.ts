import { ViewSubScriptionPlanDetails } from "../../dto/SubScriptionListItems";

 
 export interface  IGetMySubscriptionPlan{
    execute(
    accountId: string,
  ): Promise<ViewSubScriptionPlanDetails | null> 
 }
 
