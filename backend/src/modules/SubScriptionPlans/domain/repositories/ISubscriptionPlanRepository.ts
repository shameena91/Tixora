import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";

import {
  SubscriptionPlan,
  SubscriptionPlanStatus,
} from "../entities/SubscriptionPlan";

import { CreateSubscriptionPlanDTO } from "../../application/validator/CreateSubscriptionPlanValidator";

import {
  SubscriptionPlanCreateData,
} from "../../application/mappers/SubscriptionPlanMapper";

export interface ISubscriptionPlanRepository
  extends IBaseRepository<
    SubscriptionPlan,
    SubscriptionPlanCreateData
  > {

  findAllByStatus(
    status?: SubscriptionPlanStatus
  ): Promise<SubscriptionPlan[]>;

  update(
    id: string,
    plan: CreateSubscriptionPlanDTO
  ): Promise<SubscriptionPlan>;

  updateStatus(
    id: string,
    status: SubscriptionPlanStatus
  ): Promise<void>;

  delete(
    id: string
  ): Promise<void>;
}