import { SubscriptionPlanStatus } from "../../../domain/entities/SubscriptionPlan";

export interface IUpdatePlanStatus {
  execute(id: string, status: SubscriptionPlanStatus): Promise<void>;
}
