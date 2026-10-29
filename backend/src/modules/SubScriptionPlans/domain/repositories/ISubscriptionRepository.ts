
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
     page?: number,
  limit?: number,
  ): Promise<Subscription[]>;
countByCompanyId(
  companyId: string,
): Promise<number>;
  findByRazorpayOrderId(
    razorpayOrderId: string,
  ): Promise<Subscription | null>;

 updateSubscription(
  id: string,
  data: {
    status?: SubscriptionStatus;
    startDate?: Date;
    endDate?: Date | null;
    razorpayOrderId?: string | null;
    // planId?: string;
    // billingCycle?: BillingCycle;
  },
): Promise<Subscription>;

  expireActiveSubscriptions(
  currentDate: Date,
): Promise<number>;
findActiveByCompanyId(
  companyId: string,
): Promise<Subscription | null>;

activateScheduledSubscriptions(
  currentDate: Date,
): Promise<number>;
// findDueScheduledSubscriptions(
//   currentDate: Date,
// ): Promise<Subscription[]>;
}