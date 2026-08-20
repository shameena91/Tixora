import { Account } from "../entities/Account";

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findByEmail(email: string): Promise<Account | null>;
  findById(id: string): Promise<Account | null>;
  //  update(account: Account): Promise<Account>;
  updateAdminDetails( id: string,
  firstName: string,
  lastName: string,
  phone: string,
  designation: string):Promise<Account | null>

}