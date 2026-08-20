import bcrypt from "bcrypt";
import { CreatePasswordRequestDto } from "../dto/CreatePasswordDto";

import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import {
  Account,
  AccountStatus,
  RegistrationStep,
} from "../../domain/entities/Account";

export class CreatePassword {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(passwordDto: CreatePasswordRequestDto): Promise<void> {
    if (passwordDto.password !== passwordDto.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const hashedPassword = await bcrypt.hash(passwordDto.password, 10);

    const account = new Account(
      crypto.randomUUID(),
      passwordDto.email,

      "",
      "",
      "",
      "",
      hashedPassword,
      AccountStatus.PENDING,
      true,
      RegistrationStep.ADMIN_DETAILS,
      new Date(),
      new Date(),
    );
    await this.accountRepository.create(account);
  }
}
