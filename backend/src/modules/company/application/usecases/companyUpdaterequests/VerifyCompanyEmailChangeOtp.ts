
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IOtpStore } from "../../../../auth/application/ports/IOtpStore";
import { IVerifyCompanyEmailChangeOtp } from "../../abstraction/companyUpdaterequests/IVerifyCompanyEmailChangeOtp";

export class VerifyCompanyEmailChangeOtp
  implements IVerifyCompanyEmailChangeOtp
{
  constructor(
    private readonly _otpStore: IOtpStore,
    private readonly _companyRepository: ICompanyRepository,
  ) {}

  async execute(
    accountId: string,
    email: string,
    otp: string,
  ): Promise<void> {
    const normalizedEmail = email.trim().toLowerCase();
    const purpose = "company-email-change";

    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPANY_NOT_FOUND,
      );
    }

    if (company.companyEmail.toLowerCase() === normalizedEmail) {
      throw new AppErrors(
            MESSAGES.INVALID_EMAIL_OR_PASSWORD,
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

const existingCompany =
  await this._companyRepository.findOne({
    companyEmail: normalizedEmail,
  });

if (existingCompany) {
  throw new AppErrors(
    MESSAGES.EMAIL_ALREADY_VERIFIED,
    ErrorCode.EMAIL_ALREADY_VARIFIED,
  );
}

    const savedOtp = await this._otpStore.get(
      normalizedEmail,
      purpose,
    );

    if (!savedOtp || savedOtp !== otp) {
      throw new AppErrors(
        MESSAGES.INVALID_OTP,
       ErrorCode.INVALID_OTP,
      );
    }

    const updatedCompany = await this._companyRepository.update(
      { accountId },
      { companyEmail: normalizedEmail },
    );

    if (!updatedCompany) {
      throw new AppErrors(
        MESSAGES.FAILED_TO_UPDATE_EMAIL,
        ErrorCode.FAILED_TO_UPDATE_EMAIL,
      );
    }

    await this._otpStore.delete(normalizedEmail, purpose);
  }
}