// import { AccountRole } from "../../../../auth/domain/entities/Account";
// import { SubscriptionPlanStatus } from "../../../domain/entities/SubscriptionPlan";

// import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
// import { IGetAllSubscriptions } from "../../abstraction/subscription-plan/IGetAllSubscriptions";
// import { GetSubscriptionsPaginatedResponse } from "../../dto/GetSubscriptionsPaginatedResponseDto";
// import { SubScriptionListItems } from "../../dto/SubScriptionListItems";


// export class GetAllSubscriptions
//   implements IGetAllSubscriptions
// {
//   constructor(
//     private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
//   ) {}

//   async execute(
//     role: AccountRole,
//     page: number,
//     limit: number,
//   ): Promise<
//     SubScriptionListItems[] | GetSubscriptionsPaginatedResponse
//   > {
//     if (role === AccountRole.COMPANY_ADMIN) {
//       const subscriptions =
//         await this._subscriptionPlanRepository.findAllByStatus(
//           SubscriptionPlanStatus.ACTIVE,
//         );

//       return subscriptions.map((subscription) => ({
//         id: subscription.id,
//         name: subscription.name,
//         description: subscription.description,
//         monthlyPrice: subscription.monthlyPrice,
//         yearlyPrice: subscription.yearlyPrice,
//         memberLimit: subscription.memberLimit,
//         companyAdminLimit:
//           subscription.companyAdminLimit,
//         departmentLimit:
//           subscription.departmentLimit,
//         ticketLimit:
//           subscription.ticketLimit,
//         automaticTicketAssignment:
//           subscription.automaticTicketAssignment,
//         slaManagement:
//           subscription.slaManagement,
//         planStatus:
//           subscription.subscriptionPlanStatus,
//       }));
//     }

//     const result =
//       await this._subscriptionPlanRepository.findAllPaginated(
//         page,
//         limit,
//       );

//     return {
//       data: result.data.map((subscription) => ({
//         id: subscription.id,
//         name: subscription.name,
//         description: subscription.description,
//         monthlyPrice: subscription.monthlyPrice,
//         yearlyPrice: subscription.yearlyPrice,
//         memberLimit: subscription.memberLimit,
//         companyAdminLimit:
//           subscription.companyAdminLimit,
//         departmentLimit:
//           subscription.departmentLimit,
//         ticketLimit:
//           subscription.ticketLimit,
//         automaticTicketAssignment:
//           subscription.automaticTicketAssignment,
//         slaManagement:
//           subscription.slaManagement,
//         planStatus:
//           subscription.subscriptionPlanStatus,
//       })),
//       total: result.total,
//       page: result.page,
//       limit: result.limit,
//       totalPages: result.totalPages,
//     };
//   }
// }



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