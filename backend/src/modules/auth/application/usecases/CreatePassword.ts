
import { CreatePasswordRequestDto } from "../dto/CreatePasswordDto";

import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import {Account,AccountStatus,RegistrationStep} from "../../domain/entities/Account";

import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { ICreatePassword } from "../abstractions/ICreatepassword";
import { IPasswordHasher } from "../ports/IPasswordHasher";

export class CreatePassword implements ICreatePassword {
  constructor(private readonly accountRepository: IAccountRepository,
     private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(passwordDto: CreatePasswordRequestDto): Promise<void> {
    if (passwordDto.password !== passwordDto.confirmPassword) {
      throw new AppErrors(
        MESSAGES.PASSWORDS_DO_NOT_MATCH,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const hashedPassword = await this.passwordHasher.hash(
  passwordDto.password
);

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
