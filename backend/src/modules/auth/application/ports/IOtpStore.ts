export interface IOtpStore {
  save(
    email: string,
    otp: string,
    expiresInSeconds: number,
    purpose: string
  ): Promise<void>;

  get(
    email: string,
    purpose: string
  ): Promise<string | null>;

  delete(
    email: string,
    purpose: string
  ): Promise<void>;
}