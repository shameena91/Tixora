
import {
  Account,
  RegistrationStep,
} from "../../../domain/entities/Account";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { AccountModel } from "../models/AccountModel";
import {
  AccountCreateData,
  AccountDocument,
  AccountMapper,
} from "../../../application/mappers/AccountMapper"
import { IBaseRepository } from "../../../../../shared/repository/IBaseRepository";

export class AccountRepository implements IAccountRepository {
  constructor(
    private readonly baseRepository: IBaseRepository<
      AccountDocument,
      AccountCreateData
    >,
  ) {}
  async create(account: Account): Promise<Account> {
    const persistenceData = AccountMapper.toPersistence(account);

    const accountDocument = await this.baseRepository.create(persistenceData);

    return AccountMapper.toDomain(accountDocument);
  }

  async findByEmail(email: string): Promise<Account | null> {
    const accountDocument = await AccountModel.findOne({
      email,
    }).lean<AccountDocument>();

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(accountDocument);
  }

  async findById(id: string): Promise<Account | null> {
    const accountDocument = await this.baseRepository.findById(id);

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(accountDocument);
  }

  async updateAdminDetails(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    designation: string,
  ): Promise<Account> {
    const accountDocument = await AccountModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        phone,
        designation,
      },
      {
        returnDocument: "after",
      },
    ).lean<AccountDocument>();

    if (!accountDocument) {
      throw new Error("Account not found");
    }

    return AccountMapper.toDomain(accountDocument);
  }

  async updateRegistrationStep(
    accountId: string,
    step: RegistrationStep,
  ): Promise<void> {
    await AccountModel.findByIdAndUpdate(accountId, {
      registrationStep: step,
      updatedAt: new Date(),
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await AccountModel.findByIdAndUpdate(
      id,
      {
        passwordHash,
      },
      {
        new: false,
      },
    );
  }
}
