import { IVarifyOtp } from "../abstractions/IVarifyOtp";
import { VerifyOtpDto } from "../dto/VarifyOtpDto";
import { IOtpStore } from "../ports/IOtpStore";

export class VarifyOtp implements IVarifyOtp{
  constructor(private readonly otpStore: IOtpStore) {}

  async execute(dto: VerifyOtpDto): Promise<boolean> {
    const storedOtp = await this.otpStore.get(dto.email, dto.purpose);

    if (!storedOtp) {
      return false;
    }

    if (storedOtp !== dto.otp) {
      return false;
    }

    await this.otpStore.delete(dto.email, dto.purpose);

    return true;
  }
}
