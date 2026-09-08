import bcrypt from "bcrypt";

import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { IResetPassword } from "../abstractions/IResetPassword";
import { IPasswordHasher } from "../ports/IPasswordHasher";

 export class ResetPassword implements IResetPassword {
  constructor(private readonly accountRepository: IAccountRepository,
      private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> {
    if (password !== confirmPassword) {
      throw new AppErrors(
        MESSAGES.PASSWORDS_DO_NOT_MATCH,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const account = await this.accountRepository.findByEmail(email);

    if (!account) {
      throw new AppErrors(MESSAGES.ACCOUNT_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }

    const hashedPassword = await this.passwordHasher.hash(password);

    await this.accountRepository.updatePassword(account.id, hashedPassword);
  }
}
