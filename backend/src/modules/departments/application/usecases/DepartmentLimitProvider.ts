import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";


import type { ISubscriptionPlanRepository } from
  "../../../SubScriptionPlans/domain/repositories/ISubscriptionPlanRepository";

import type { ISubscriptionRepository } from
  "../../../SubScriptionPlans/domain/repositories/ISubscriptionRepository";
import { IDepartmentLimitProvider } from "../abstarction/IDepartmentLimitProvider";

export class DepartmentLimitProvider
  implements IDepartmentLimitProvider
{
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async getDepartmentLimit(companyId: string): Promise<number|null> {
    const subscription =
      await this._subscriptionRepository.findByCompanyId(companyId);

    if (!subscription) {
       throw new AppErrors(
              MESSAGES.SUBSCRIPTION_NOT_FOUND,
              ErrorCode.DEPARTMENT_NOT_FOUND,
            );
    }

    const subscriptionPlan =
      await this._subscriptionPlanRepository.findById(subscription.planId);

    if (!subscriptionPlan) {
      throw new AppErrors(
             MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
             ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
           );
    }
if (subscriptionPlan.departmentLimit === null) {

    throw new AppErrors(
            "Department limit is not configured",
             ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
           );
 
}

    return subscriptionPlan.departmentLimit;
  }
}