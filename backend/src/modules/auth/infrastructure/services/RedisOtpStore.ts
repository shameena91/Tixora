import { OtpStore } from "../../application/ports/OtpStore";
import { redisClient } from "../database/redis/redis";

export class RedisOtpStore implements OtpStore {
  async save(
    email: string,
    otp: string,
    expiresInSeconds: number
  ): Promise<void> {
    await redisClient.set(
      `otp:${email}`,
      otp,
      {
        EX:expiresInSeconds
      }
    )

  }
   async get(email: string): Promise<string | null> {
    return await redisClient.get(`otp:${email}`);
  }

  async delete(email: string): Promise<void> {
    await redisClient.del(`otp:${email}`)
  }
}