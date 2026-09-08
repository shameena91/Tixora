import { Account, RegistrationStep } from "../entities/Account";

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
  updateAdminDetails( id: string,
  firstName: string,
  lastName: string,
  phone: string,
  designation: string):Promise<Account | null>
 updateRegistrationStep(
    accountId: string,
    step: RegistrationStep
  ): Promise<void>;

 updatePassword(
    id: string,
    passwordHash: string
  ): Promise<void>;
}