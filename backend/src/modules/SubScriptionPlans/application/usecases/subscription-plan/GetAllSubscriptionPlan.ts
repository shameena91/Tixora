

import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IGetAllSubscriptions } from "../../abstraction/subscription-plan/IGetAllSubscriptions";
import { GetSubscriptionsPaginatedResponseDto } from "../../dto/GetSubscriptionsPaginatedResponseDto";

export class GetAllSubscriptionPlan
  implements IGetAllSubscriptions
{
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<GetSubscriptionsPaginatedResponseDto> {
    const result =
      await this._subscriptionPlanRepository.findAllPaginated(
        page,
        limit,
      );

    return {
      data: result.data.map((subscription) => ({
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
        ticketLimit:
          subscription.ticketLimit,
        automaticTicketAssignment:
          subscription.automaticTicketAssignment,
        slaManagement:
          subscription.slaManagement,
        planStatus:
          subscription.subscriptionPlanStatus,
      })),

      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}