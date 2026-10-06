import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IGetSubscriptionPlanById } from "../../abstraction/subscription-plan/IGetSubscriptionPlanById";
import { ViewSubScriptionPlanDetails } from "../../dto/SubScriptionListItems";

export class GetSubscriptionPlanById implements IGetSubscriptionPlanById {
  constructor(
    private readonly _subcriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(id: string): Promise<ViewSubScriptionPlanDetails> {
    const subscriptionPlan = await this._subcriptionPlanRepository.findById(id);

    if (!subscriptionPlan) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    return {
      id: subscriptionPlan.id,
      name: subscriptionPlan.name,
      description: subscriptionPlan.description,
      monthlyPrice: subscriptionPlan.monthlyPrice,
      yearlyPrice: subscriptionPlan.yearlyPrice,
      memberLimit: subscriptionPlan.memberLimit,
      companyAdminLimit: subscriptionPlan.companyAdminLimit,
      departmentLimit: subscriptionPlan.departmentLimit,
      ticketLimit: subscriptionPlan.ticketLimit,
      automaticTicketAssignment: subscriptionPlan.automaticTicketAssignment,
      slaManagement: subscriptionPlan.slaManagement,
      status: subscriptionPlan.subscriptionPlanStatus,
      createdAt: subscriptionPlan.createdAt,
      updatedAt: subscriptionPlan.updatedAt,
    };
  }
}
