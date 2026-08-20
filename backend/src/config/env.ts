import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  mongodbUri: process.env.MONGODB_URI ?? "",
   redisUrl: process.env.REDIS_URL,
   emailUser:process.env.EMAIL_USER,
   emailPswd:process.env.EMAIL_PASSWORD
};