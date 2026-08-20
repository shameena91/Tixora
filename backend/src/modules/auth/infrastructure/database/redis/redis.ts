import { createClient } from "redis";
import { env } from "../../../../../config/env";

export const redisClient = createClient({
  url:env.redisUrl,
});

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};