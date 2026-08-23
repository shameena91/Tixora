export interface IPasswordHasher {
  compare(
    plainPassword: string,
    passwordHash: string
  ): Promise<boolean>;
}