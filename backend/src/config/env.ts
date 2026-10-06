import "dotenv/config";

// export const env = {
//   nodeEnv: process.env.NODE_ENV ?? "development",
//   port: Number(process.env.PORT ?? 3000),
//   mongodbUri: process.env.MONGODB_URI ?? "",
//    redisUrl: process.env.REDIS_URL,
//    emailUser:process.env.EMAIL_USER,
//    emailPswd:process.env.EMAIL_PASSWORD,
//    awsregion:process.env.AWS_REGION,
//    awsBucketName:process.env.AWS_S3_BUCKET_NAME,
//   jwtAccessToken: process.env.JWT_ACCESS_SECRET!,
//   jwtRefreshToken :process.env.JWT_REFRESH_SECRET!,
//   maxAge:Number(process.env.REFRESH_TOKEN_MAX_AGE),
//   emailSuperAdmin:process.env.SUPER_ADMIN_EMAIL,
//   passwordSuperAdmin:process.env.SUPER_ADMIN_PASSWORD,
//   razorpayKeyId:process.env.RAZORPAY_KEY_ID,
//   razorpaySecretKey:process.env.RAZORPAY_KEY_SECRET,
// };

const requiredEnv = (
  name: string
): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `${name} is not defined`
    );
  }

  return value;
};

export const env = {
  nodeEnv:
    process.env.NODE_ENV ?? "development",

  port:
    Number(process.env.PORT ?? 3000),

  mongodbUri:
    requiredEnv("MONGODB_URI"),

  redisUrl:
    process.env.REDIS_URL,

  emailUser:
    process.env.EMAIL_USER,

  emailPswd:
    process.env.EMAIL_PASSWORD,

  awsregion:
    process.env.AWS_REGION,

  awsBucketName:
    process.env.AWS_S3_BUCKET_NAME,

  jwtAccessToken:
    requiredEnv("JWT_ACCESS_SECRET"),

  jwtRefreshToken:
    requiredEnv("JWT_REFRESH_SECRET"),

  maxAge:
    Number(process.env.REFRESH_TOKEN_MAX_AGE ?? 0),

  emailSuperAdmin:
    process.env.SUPER_ADMIN_EMAIL,

  passwordSuperAdmin:
    process.env.SUPER_ADMIN_PASSWORD,

  razorpayKeyId:
    requiredEnv("RAZORPAY_KEY_ID"),

  razorpaySecretKey:
    requiredEnv("RAZORPAY_KEY_SECRET"),
};