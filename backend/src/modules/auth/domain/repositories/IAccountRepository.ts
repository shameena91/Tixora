// import { Account, AccountStatus, RegistrationStep } from "../entities/Account";

// export interface IAccountRepository {
//   create(account: Account): Promise<Account>;
//   findByEmail(email: string): Promise<Account | null>;
//   findById(id: string): Promise<Account | null>;
//   findByPhone(phone: string): Promise<Account | null>;
//   updateAdminDetails( id: string,
//   firstName: string,
//   lastName: string,
//   phone: string,
//   designation: string):Promise<Account | null>
//  updateRegistrationStep(
//     accountId: string,
//     step: RegistrationStep
//   ): Promise<void>;

//  updatePassword(
//     id: string,
//     passwordHash: string
//   ): Promise<void>;

//   findSuperAdmin():Promise<Account|null>
//   updateStatus(
//   id: string,
//   status: AccountStatus,
// ): Promise<void>;
// }

import {
  IBaseRepository,
} from "../../../../shared/repository/IBaseRepository";

import {
  Account,
  AccountStatus,
  RegistrationStep,
} from "../entities/Account";

export interface IAccountRepository
  extends IBaseRepository<Account> {

  findByEmail(
    email: string,
  ): Promise<Account | null>;

  findByPhone(
    phone: string,
  ): Promise<Account | null>;

  updateAdminDetails(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    designation: string,
  ): Promise<Account | null>;

  updateRegistrationStep(
    accountId: string,
    step: RegistrationStep,
  ): Promise<void>;

  updatePassword(
    id: string,
    passwordHash: string,
  ): Promise<void>;

  findSuperAdmin(): Promise<Account | null>;

  updateStatus(
    id: string,
    status: AccountStatus,
  ): Promise<void>;
}