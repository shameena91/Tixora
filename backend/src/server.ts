import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { connectRedis } from "./modules/auth/infrastructure/database/redis/redis.js";
import { startSubscriptionExpiryJob } from "./modules/SubScriptionPlans/infrastructure/jobs/SubscriptionExpiryJob.js";
import { checkExpiredSubscriptionsOnStartup } from "./modules/SubScriptionPlans/infrastructure/jobs/SubscriptionExpiryStartupCheck.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await connectRedis();
  console.log("Redis  connected");
await checkExpiredSubscriptionsOnStartup()
  startSubscriptionExpiryJob();
app.listen(env.port, () => {
  console.log(`Tixora server running on port ${env.port}`);
});
}
startServer()