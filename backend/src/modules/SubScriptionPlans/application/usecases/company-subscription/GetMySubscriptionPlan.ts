
import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { IGetMySubscriptionPlan } from "../../abstraction/company-subscription/IGetMySubscriptionPlan";
import { IGetSubscriptionPlanById } from "../../abstraction/subscription-plan/IGetSubscriptionPlanById";
import { ViewSubScriptionPlanDetails } from "../../dto/SubScriptionListItems";

export class GetMySubscriptionPlan implements IGetMySubscriptionPlan  {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _getSubscriptionPlanById: IGetSubscriptionPlanById,
  ) {}

  async execute(
    accountId: string,
  ): Promise<ViewSubScriptionPlanDetails | null> {
 
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const subscription =
      await this._subscriptionRepository.findByCompanyId(company.id);

    if (!subscription) {
      return null;
    }


    return this._getSubscriptionPlanById.execute(
      subscription.planId,
    );
  }
}
