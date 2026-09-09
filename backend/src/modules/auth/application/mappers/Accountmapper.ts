import { Types } from "mongoose";
import {
  AccountRole,
  Account,
  AccountStatus,
  RegistrationStep,
} from "../../domain/entities/Account";

export interface AccountDocument {
  _id: Types.ObjectId;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  designation?: string;
  role: AccountRole;
  passwordHash: string | null;
  status: AccountStatus;
  emailVerified: boolean;
  registrationStep: RegistrationStep;
  createdAt: Date;
  updatedAt: Date;
}

export type AccountCreateData = Omit<
  AccountDocument,
  "_id" | "createdAt" | "updatedAt"
>;

export class AccountMapper {
  static toDomain(doc: AccountDocument): Account {
    return new Account(
      doc._id.toString(),
      doc.email,
      doc.firstName ?? "",
      doc.lastName ?? "",
      doc.phone ?? "",
      doc.designation ?? "",
      doc.passwordHash,
      doc.role,
      doc.status,

      doc.emailVerified,
      doc.registrationStep,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(account: Account): AccountCreateData {
    return {
      email: account.email,
      firstName: account.firstName,
      lastName: account.lastName,
      phone: account.phone,
      designation: account.designation,
      passwordHash: account.passwordHash,
      role: account.role,
      status: account.status,
      emailVerified: account.emailVerified,
      registrationStep: account.registrationStep,
    };
  }
}
