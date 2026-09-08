export interface IResetPassword {
  execute(
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<void>;
}