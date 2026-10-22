import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";


export class ExpireSubscriptionsUseCase {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,
  ) {}

  async execute(): Promise<number> {
    const currentDate = new Date();

    return await this._subscriptionRepository.expireActiveSubscriptions(
      currentDate,
    );
  }
}