import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { ISendForgotPasswordOtp } from "../abstractions/ISendForgotPasswordOtp";
import { IOtpService } from "../ports/IOtpService";

export class SendForgotPasswordOtp implements ISendForgotPasswordOtp {
  constructor(
    private readonly _otpService: IOtpService,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const account = await this._accountRepository.findByEmail(email);

    if (!account) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
    }

    await this._otpService.sendOtp(email, "forgot-password");
  }
}