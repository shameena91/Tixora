export interface IVerifyCompanyEmailChangeOtp {
  execute(
    accountId: string,
    email: string,
    otp: string,
  ): Promise<void>;
}