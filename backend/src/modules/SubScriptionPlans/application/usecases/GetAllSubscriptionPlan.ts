
import { AccountRole } from "../../../auth/domain/entities/Account";
import {
  SubscriptionPlanStatus,
} from "../../domain/entities/SubscriptionPlan";

import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";
import { IGetAllSubscriptions } from "../abstraction/IGetAllSubscriptions";
import { SubScriptionListItems } from "../dto/SubScriptionListItems";

export class GetAllSubscriptions
  implements IGetAllSubscriptions
{
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(
    role: AccountRole
  ): Promise<SubScriptionListItems[]> {

    let subscriptions;

    if (
      role === AccountRole.COMPANY_ADMIN
    ) {
      subscriptions =
        await this._subscriptionPlanRepository.findAllByStatus(
          SubscriptionPlanStatus.ACTIVE
        );
    } else {
      subscriptions =
        await this._subscriptionPlanRepository.findAll();
    }

    return subscriptions.map((subscription) => ({
      id: subscription.id,
      name: subscription.name,
      description: subscription.description,
      monthlyPrice: subscription.monthlyPrice,
      yearlyPrice: subscription.yearlyPrice,
      memberLimit: subscription.memberLimit,
      companyAdminLimit:
        subscription.companyAdminLimit,
      departmentLimit:
        subscription.departmentLimit,
      ticketLimit: subscription.ticketLimit,
      automaticTicketAssignment:
        subscription.automaticTicketAssignment,
      slaManagement:
        subscription.slaManagement,
    }));
  }
}