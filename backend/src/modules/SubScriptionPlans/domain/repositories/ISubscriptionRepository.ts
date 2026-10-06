// import { Subscription, SubscriptionStatus } from "../entities/Subscription";

// export interface ISubscriptionRepository {
//   create(subscription: Subscription): Promise<Subscription>;
//   findById(id: string): Promise<Subscription | null>;
//   findAll(): Promise<Subscription[]>;
//   findByCompanyId(companyId: string): Promise<Subscription | null>;
//   findAllByCompanyId(companyId: string): Promise<Subscription[]>;
//   findByRazorpayOrderId(razorpayOrderId: string): Promise<Subscription | null>;
//   update(
//     id: string,
//     data: {
//       status?: SubscriptionStatus;
//       startDate?: Date;
//       endDate?: Date | null;
//     },
//   ): Promise<Subscription>;
// }
import {
  IBaseRepository,
} from "../../../../shared/repository/IBaseRepository";

import {
  Subscription,
  SubscriptionStatus,
} from "../entities/Subscription";

export interface ISubscriptionRepository
  extends IBaseRepository<Subscription> {

  findByCompanyId(
    companyId: string,
  ): Promise<Subscription | null>;

  findAllByCompanyId(
    companyId: string,
  ): Promise<Subscription[]>;

  findByRazorpayOrderId(
    razorpayOrderId: string,
  ): Promise<Subscription | null>;

  updateSubscription(
    id: string,
    data: {
      status?: SubscriptionStatus;
      startDate?: Date;
      endDate?: Date | null;
    },
  ): Promise<Subscription>;
}