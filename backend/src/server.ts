import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { connectRedis } from "./modules/auth/infrastructure/database/redis/redis.js";

const startServer = async (): Promise<void> => {
  await connectDatabase();
  await connectRedis();
  console.log("Redis  connected");


app.listen(env.port, () => {
  console.log(`Tixora server running on port ${env.port}`);
});
}
startServer()