import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IAdminRegistration } from "../abstractions/IAdminRegistration";
import { AdminRegistrationRequestDto } from "../validators/AdminRegistrationValidator";

export class AdminRegistration implements IAdminRegistration {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(dto: AdminRegistrationRequestDto) {
    const account = await this.accountRepository.findByEmail(dto.email);

    if (!account) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await this.accountRepository.updateAdminDetails(
      account.id,
      dto.firstName,
      dto.lastName,
      dto.phoneNumber,
      dto.designation,
    );

    return {
      accountId: account.id,
    };
  }
}
