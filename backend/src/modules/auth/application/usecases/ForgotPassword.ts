
import { IForgotPassword } from "../abstractions/IforgotPassword";
import { ISendForgotPasswordOtp } from "../abstractions/ISendForgotPasswordOtp";

export class ForgotPassword implements IForgotPassword {
  constructor(
    private readonly sendForgotPasswordOtp: ISendForgotPasswordOtp
  ) {}

  async execute(email: string): Promise<void> {
    await this.sendForgotPasswordOtp.execute(email);
  }
}