import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { SubscriptionPlan } from "../../domain/entities/SubscriptionPlan";

export interface ISubscriptionPlanRepository extends IBaseRepository<SubscriptionPlan> {
 

//   update(plan: SubscriptionPlan): Promise<SubscriptionPlan>;

//   delete(id: string): Promise<void>;
}