export interface ISendForgotPasswordOtp {
  execute(email: string): Promise<void>;
}