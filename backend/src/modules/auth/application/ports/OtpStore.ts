export interface OtpStore {
  save(
    email: string,
    otp: string,
    expiresInSeconds: number
  ): Promise<void>;

  get(email: string): Promise<string | null>;

  delete(email: string): Promise<void>;
}