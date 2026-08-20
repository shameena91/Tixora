export interface EmailService {
  sendOtp(email: string, otp: string): Promise<void>;
}