import { SubscriptionPlanStatus } from "../../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";

;
import { IGetActiveSubscriptionPlans } from "../../abstraction/subscription-plan/IGetActiveSubscriptionPlans";
import { SubScriptionListItems } from "../../dto/SubScriptionListItems";


export class GetActiveSubscriptionPlans
  implements IGetActiveSubscriptionPlans
{
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(): Promise<SubScriptionListItems[]> {
  const subscriptions =
    await this._subscriptionPlanRepository.findAllByStatus(
      SubscriptionPlanStatus.ACTIVE,
    );

  return subscriptions.map((subscription) => ({
    id: subscription.id,
    name: subscription.name,
    description: subscription.description,
    monthlyPrice: subscription.monthlyPrice,
    yearlyPrice: subscription.yearlyPrice,
    memberLimit: subscription.memberLimit,
    companyAdminLimit: subscription.companyAdminLimit,
    departmentLimit: subscription.departmentLimit,
    ticketLimit: subscription.ticketLimit,
    automaticTicketAssignment:
      subscription.automaticTicketAssignment,
    slaManagement: subscription.slaManagement,
    planStatus: subscription.subscriptionPlanStatus,
  }));
}
}