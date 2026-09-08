import { Account } from "../../domain/entities/Account";

export class AccountResponseMapper {
  static toLoginAccount(account: Account) {
    return {
      id: account.id,
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
    };
  }
}