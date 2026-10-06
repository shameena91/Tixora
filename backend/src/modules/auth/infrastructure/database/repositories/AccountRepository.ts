
// import {
//   Account,
//   AccountRole,
//   AccountStatus,
//   RegistrationStep,
// } from "../../../domain/entities/Account";
// import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
// import { AccountModel } from "../models/AccountModel";
// import {
//   AccountCreateData,
//   AccountDocument,
//   AccountMapper,
// } from "../../../application/mappers/Accountmapper"
// import { IBaseRepository } from "../../../../../shared/repository/IBaseRepository";

// export class AccountRepository implements IAccountRepository {
//   constructor(
//     private readonly _baseRepository: IBaseRepository<
//       AccountDocument,
//       AccountCreateData
//     >,
//   ) {}
//   async create(account: Account): Promise<Account> {
//     const persistenceData = AccountMapper.toPersistence(account);

//     const accountDocument = await this._baseRepository.create(persistenceData);

//     return AccountMapper.toDomain(accountDocument);
//   }

//   async findByEmail(email: string): Promise<Account | null> {
//     const accountDocument = await AccountModel.findOne({
//       email,
//     }).lean<AccountDocument>();

//     if (!accountDocument) {
//       return null;
//     }

//     return AccountMapper.toDomain(accountDocument);
//   }

//   async findById(id: string): Promise<Account | null> {
//     const accountDocument = await this._baseRepository.findById(id);

//     if (!accountDocument) {
//       return null;
//     }

//     return AccountMapper.toDomain(accountDocument);
//   }
// async findByPhone(phone: string): Promise<Account | null> {
//   const accountDocument =
//     await AccountModel.findOne({
//       phone,
//     }).lean<AccountDocument>();

//   if (!accountDocument) {
//     return null;
//   }

//   return AccountMapper.toDomain(accountDocument);
// }
//   async updateAdminDetails(
//     id: string,
//     firstName: string,
//     lastName: string,
//     phone: string,
//     designation: string,
//   ): Promise<Account> {
//     const accountDocument = await AccountModel.findByIdAndUpdate(
//       id,
//       {
//         firstName,
//         lastName,
//         phone,
//         designation,
//       },
//       {
//         returnDocument: "after",
//       },
//     ).lean<AccountDocument>();

//     if (!accountDocument) {
//       throw new Error("Account not found");
//     }

//     return AccountMapper.toDomain(accountDocument);
//   }

//   async updateRegistrationStep(
//     accountId: string,
//     step: RegistrationStep,
//   ): Promise<void> {
//     await AccountModel.findByIdAndUpdate(accountId, {
//       registrationStep: step,
//       updatedAt: new Date(),
//     });
//   }

//   async updatePassword(id: string, passwordHash: string): Promise<void> {
//     await AccountModel.findByIdAndUpdate(
//       id,
//       {
//         passwordHash,
//       },
//       {
//         new: false,
//       },
//     );
//   }

//   async findSuperAdmin():Promise<Account|null>{
//     const accountDocument=await AccountModel.findOne({role:AccountRole.SUPER_ADMIN

//     }).lean<AccountDocument>()
//     if(!accountDocument)
//     {
//       return null
//     }
//     return AccountMapper.toDomain(accountDocument)
//   }
//   async updateStatus(
//   id: string,
//   status: AccountStatus,
// ): Promise<void> {
//   await this._baseRepository.update(
//     { _id: id },
//     {
//       status,
//       updatedAt: new Date(),
//     },
//   );
// }
// }



import {
  Account,
  AccountRole,
  AccountStatus,
  RegistrationStep,
} from "../../../domain/entities/Account";

import {
  IAccountRepository,
} from "../../../domain/repositories/IAccountRepository";

import {
  AccountModel,
} from "../models/AccountModel";

import {
  AccountCreateData,
  AccountDocument,
  AccountMapper,
} from "../../../application/mappers/Accountmapper";

import {
  IBaseRepository,
} from "../../../../../shared/repository/IBaseRepository";

export class AccountRepository
  implements IAccountRepository
{
  constructor(
    private readonly _baseRepository: IBaseRepository<
      AccountDocument,
      AccountCreateData
    >,
  ) {}

  // -------------------------
  // Common CRUD
  // -------------------------

  async create(
    account: Account,
  ): Promise<Account> {
    const persistenceData =
      AccountMapper.toPersistence(account);

    const accountDocument =
      await this._baseRepository.create(
        persistenceData,
      );

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async findById(
    id: string,
  ): Promise<Account | null> {
    const accountDocument =
      await this._baseRepository.findById(id);

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async findOne(
    filter: Partial<Account>,
  ): Promise<Account | null> {
    const accountDocument =
      await this._baseRepository.findOne(
        filter as Partial<AccountDocument>,
      );

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async findAll(
    filter?: Partial<Account>,
    sort?: Record<string, 1 | -1>,
  ): Promise<Account[]> {
    const accountDocuments =
      await this._baseRepository.findAll(
        filter as Partial<AccountDocument>,
        sort,
      );

    return accountDocuments.map(
      (document) =>
        AccountMapper.toDomain(document),
    );
  }

  async update(
    filter: Partial<Account>,
    data: Partial<Account>,
  ): Promise<Account | null> {
    const accountDocument =
      await this._baseRepository.update(
        filter as Partial<AccountDocument>,
        data as Partial<AccountDocument>,
      );

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  // -------------------------
  // Account-specific methods
  // -------------------------

  async findByEmail(
    email: string,
  ): Promise<Account | null> {
    const accountDocument =
      await AccountModel.findOne({
        email,
      })
        .lean<AccountDocument>()
        .exec();

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async findByPhone(
    phone: string,
  ): Promise<Account | null> {
    const accountDocument =
      await AccountModel.findOne({
        phone,
      })
        .lean<AccountDocument>()
        .exec();

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async updateAdminDetails(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    designation: string,
  ): Promise<Account> {
    const accountDocument =
      await AccountModel.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          phone,
          designation,
        },
        {
          new: true,
        },
      )
        .lean<AccountDocument>()
        .exec();

    if (!accountDocument) {
      throw new Error("Account not found");
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async updateRegistrationStep(
    accountId: string,
    step: RegistrationStep,
  ): Promise<void> {
    await AccountModel.findByIdAndUpdate(
      accountId,
      {
        registrationStep: step,
        updatedAt: new Date(),
      },
    ).exec();
  }

  async updatePassword(
    id: string,
    passwordHash: string,
  ): Promise<void> {
    await AccountModel.findByIdAndUpdate(
      id,
      {
        passwordHash,
      },
    ).exec();
  }

  async findSuperAdmin(): Promise<Account | null> {
    const accountDocument =
      await AccountModel.findOne({
        role: AccountRole.SUPER_ADMIN,
      })
        .lean<AccountDocument>()
        .exec();

    if (!accountDocument) {
      return null;
    }

    return AccountMapper.toDomain(
      accountDocument,
    );
  }

  async updateStatus(
    id: string,
    status: AccountStatus,
  ): Promise<void> {
    await AccountModel.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
    ).exec();
  }
}