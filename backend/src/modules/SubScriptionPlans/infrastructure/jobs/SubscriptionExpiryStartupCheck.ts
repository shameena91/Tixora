import { expireSubscriptionsUseCase } from "../../container/Container";


export const checkExpiredSubscriptionsOnStartup =
  async (): Promise<void> => {
    try {
      const expiredCount =
        await expireSubscriptionsUseCase.execute();

      console.log(
        `[SubscriptionExpiryStartupCheck] Expired ${expiredCount} subscriptions.`,
      );
    } catch (error) {
      console.error(
        "[SubscriptionExpiryStartupCheck] Failed:",
        error,
      );
    }
  };
