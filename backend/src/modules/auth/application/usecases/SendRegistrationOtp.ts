import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IOtpService } from "../ports/IOtpService";
import { ISendRegistrationOtp } from "../abstractions/ISendRegistrationOtp";

export class SendRegistrationOtp implements ISendRegistrationOtp {
  constructor(
    private readonly _otpService: IOtpService,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const account = await this._accountRepository.findByEmail(email);

    if (account?.emailVerified) {
      throw new AppErrors(
        MESSAGES.EMAIL_ALREADY_VERIFIED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await this._otpService.sendOtp(email, "registration");
  }
}