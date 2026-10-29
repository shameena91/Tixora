export interface ISendCompanyEmailChangeOtp {
  execute(email: string): Promise<void>;
}