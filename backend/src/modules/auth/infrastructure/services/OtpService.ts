import { IEmailService } from "../../application/ports/IEmailService";
import { IOtpService } from "../../application/ports/IOtpService";
import { IOtpStore } from "../../application/ports/IOtpStore";

export class OtpService implements IOtpService {
  constructor(
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) {}

  async sendOtp(
    email: string,
    purpose: string
  ): Promise<void> {
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await this.otpStore.save(
      email,
      otp,
      300,
      purpose
    );

    await this.emailService.sendOtp(
      email,
      otp
    );
  }
}