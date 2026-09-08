export interface ISendRegistrationOtp {
  execute(email: string): Promise<void>;
}