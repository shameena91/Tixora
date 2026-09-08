import { IOtpStore } from "../../application/ports/IOtpStore";
import { redisClient } from "../database/redis/redis";

export class RedisOtpStore implements IOtpStore {
  async save(
    email: string,
    otp: string,
    expiresInSeconds: number,
    purpose: string
  ): Promise<void> {
    await redisClient.set(
      `otp:${purpose}:${email}`,
      otp,
      {
        EX: expiresInSeconds,
      }
    );
  }

  async get(
    email: string,
    purpose: string
  ): Promise<string | null> {
    return await redisClient.get(
      `otp:${purpose}:${email}`
    );
  }

  async delete(
    email: string,
    purpose: string
  ): Promise<void> {
    await redisClient.del(
      `otp:${purpose}:${email}`
    );
  }
}