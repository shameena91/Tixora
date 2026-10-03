import { ViewSubScriptionPlanDetails } from "../../dto/SubScriptionListItems";

export interface IGetSubscriptionPlanById{
    execute(id:string):Promise<ViewSubScriptionPlanDetails>
}