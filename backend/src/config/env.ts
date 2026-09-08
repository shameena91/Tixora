import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3000),
  mongodbUri: process.env.MONGODB_URI ?? "",
   redisUrl: process.env.REDIS_URL,
   emailUser:process.env.EMAIL_USER,
   emailPswd:process.env.EMAIL_PASSWORD,
   awsregion:process.env.AWS_REGION,
   awsBucketName:process.env.AWS_S3_BUCKET_NAME,
  jwtAccessToken: process.env.JWT_ACCESS_SECRET!,
  jwtRefreshToken :process.env.JWT_REFRESH_SECRET!,
  maxAge:Number(process.env.REFRESH_TOKEN_MAX_AGE)
};