export interface IOtpService {
  sendOtp(
    email: string,
    purpose: string
  ): Promise<void>;
}