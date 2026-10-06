import { SubScriptionListItems } from "../../dto/SubScriptionListItems";

export interface IGetActiveSubscriptionPlans {
  execute(): Promise<SubScriptionListItems[]>;
}