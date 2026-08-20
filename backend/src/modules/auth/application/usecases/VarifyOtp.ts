import { OtpStore } from "../ports/OtpStore";
import { VerifyOtpDto } from "../dto/VarifyOtpDto";

export class VarifyOtp {
  constructor(
    private readonly otpStore: OtpStore
  ) {}

  async execute(dto: VerifyOtpDto): Promise<boolean> {
    const storedOtp = await this.otpStore.get(dto.email);

    if (!storedOtp) {
      return false;
    }

    if (storedOtp !== dto.otp) {
      return false;
    }

    await this.otpStore.delete(dto.email);

    return true;
  }
}