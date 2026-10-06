// import {
//   SubscriptionPlan,
//   SubscriptionPlanName,
//   SubscriptionPlanStatus,
// } from "../entities/SubscriptionPlan";

// import { CreateSubscriptionPlanDTO } from "../../presentation/validator/CreateSubscriptionPlanValidator";

// export interface ISubscriptionPlanRepository {
//   create(subscriptionPlan: SubscriptionPlan): Promise<SubscriptionPlan>;

//   findById(id: string): Promise<SubscriptionPlan | null>;

//   findAll(): Promise<SubscriptionPlan[]>;

//   findAllPaginated(
//   page: number,
//   limit: number,
// ): Promise<{
//   data: SubscriptionPlan[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }>;
//   findAllByStatus(status?: SubscriptionPlanStatus): Promise<SubscriptionPlan[]>;

//   update(
//     id: string,
//     plan: CreateSubscriptionPlanDTO,
//   ): Promise<SubscriptionPlan>;

//   updateStatus(id: string, status: SubscriptionPlanStatus): Promise<void>;

//   delete(id: string): Promise<void>;
//   findByNameAndStatus(name: SubscriptionPlanName,status:SubscriptionPlanStatus): Promise<SubscriptionPlan | null>;
// }

import {
  IBaseRepository,
} from "../../../../shared/repository/IBaseRepository";

import {
  SubscriptionPlan,
  SubscriptionPlanName,
  SubscriptionPlanStatus,
} from "../entities/SubscriptionPlan";

import {
  CreateSubscriptionPlanDTO,
} from "../../presentation/validator/CreateSubscriptionPlanValidator";

export interface ISubscriptionPlanRepository
  extends IBaseRepository<SubscriptionPlan> {

  findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{
    data: SubscriptionPlan[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  findAllByStatus(
    status?: SubscriptionPlanStatus,
  ): Promise<SubscriptionPlan[]>;

  updatePlan(
    id: string,
    plan: CreateSubscriptionPlanDTO,
  ): Promise<SubscriptionPlan>;

  updateStatus(
    id: string,
    status: SubscriptionPlanStatus,
  ): Promise<void>;

  delete(
    id: string,
  ): Promise<void>;

  findByNameAndStatus(
    name: SubscriptionPlanName,
    status: SubscriptionPlanStatus,
  ): Promise<SubscriptionPlan | null>;
}