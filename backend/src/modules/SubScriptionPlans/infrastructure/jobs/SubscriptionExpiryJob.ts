import cron from "node-cron";
import { expireSubscriptionsUseCase } from "../../container/Container";


export const startSubscriptionExpiryJob = (): void => {
  cron.schedule("* * * * *", async () => {
    try {
      const expiredCount =
        await expireSubscriptionsUseCase.execute();

      console.log(
        `SubscriptionExpiryJob Expired ${expiredCount} subscriptions.`,
      );
    } catch (error) {
      console.error(
        "SubscriptionExpiryJob Failed to expire subscriptions:",
        error,
      );
    }
  });

  console.log("[SubscriptionExpiryJob] Scheduled successfully.");
};