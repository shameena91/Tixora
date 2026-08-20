import { OtpStore } from "../ports/OtpStore";
import { EmailService } from "../ports/EmailService";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";

export class SendOtp {
  constructor(
    private readonly otpStore: OtpStore,
    private readonly emailService: EmailService,
    private readonly accountRepository:IAccountRepository
  ) {}

  async execute(email: string): Promise<void> {

      const account = await this.accountRepository.findByEmail(email);

  if (account?.emailVerified) {
    throw new Error("Email is already verified");
  }
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await this.otpStore.save(email, otp, 300);

    await this.emailService.sendOtp(
      email,
      otp,
     
    );
  }
}