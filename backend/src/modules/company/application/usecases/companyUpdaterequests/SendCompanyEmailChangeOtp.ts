import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { IOtpService } from "../../../../auth/application/ports/IOtpService";
import { ISendCompanyEmailChangeOtp } from "../../abstraction/companyUpdaterequests/ISendCompanyEmailChangeOtp";

export class SendCompanyEmailChangeOtp
  implements ISendCompanyEmailChangeOtp
{
  constructor(
    private readonly _otpService: IOtpService,
  ) {}

  async execute(email: string): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      throw new AppErrors(
        "Email is required",
        ErrorCode.BAD_REQUEST,
      );
    }

    await this._otpService.sendOtp(
      normalizedEmail,
      "company-email-change",
    );
  }
}