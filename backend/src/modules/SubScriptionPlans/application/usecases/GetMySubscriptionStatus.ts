import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";

import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";

import { Subscription } from "../../domain/entities/Subscription";
import { IGetMySubscriptionStatus } from "../abstraction/IGetmySubscriptionStatus";


export class GetMySubscriptionStatus
  implements IGetMySubscriptionStatus
{
  constructor(
    private readonly _companyRepository: ICompanyRepository,

    private readonly _subscriptionRepository:
      ISubscriptionRepository,
  ) {}

  async execute(
    accountId: string
  ): Promise<Subscription | null> {


    const company =
      await this._companyRepository.findByAccountId(
        accountId
      );

    if (!company) {
      return null;
    }

  
    return await this._subscriptionRepository.findByCompanyId(
      company.id
    );
  }
}