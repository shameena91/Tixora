import {
  SubscriptionPlan,
  SubscriptionPlanName,
  SubscriptionPlanStatus,
} from "../entities/SubscriptionPlan";

import { CreateSubscriptionPlanDTO } from "../../presentation/validator/CreateSubscriptionPlanValidator";

export interface ISubscriptionPlanRepository {
  create(subscriptionPlan: SubscriptionPlan): Promise<SubscriptionPlan>;

  findById(id: string): Promise<SubscriptionPlan | null>;

  findAll(): Promise<SubscriptionPlan[]>;
  findAllByStatus(status?: SubscriptionPlanStatus): Promise<SubscriptionPlan[]>;

  update(
    id: string,
    plan: CreateSubscriptionPlanDTO,
  ): Promise<SubscriptionPlan>;

  updateStatus(id: string, status: SubscriptionPlanStatus): Promise<void>;

  delete(id: string): Promise<void>;
  findByName(name: SubscriptionPlanName): Promise<SubscriptionPlan | null>;
}
