
import { RedisOtpStore } from "../infrastructure/services/RedisOtpStore";
import { EmailNodemailerService } from "../infrastructure/services/EmailNodemailerService";
import { OtpService } from "../infrastructure/services/OtpService";
import { BcryptpasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";

import { AccountRepository } from "../infrastructure/database/repositories/AccountRepository";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { AccountModel } from "../infrastructure/database/models/AccountModel";

import {
  AccountCreateData,
  AccountDocument,
} from "../application/mappers/Accountmapper";

// Shared instances
export const emailService = new EmailNodemailerService();

export const otpStore = new RedisOtpStore();

export const otpService = new OtpService(
  otpStore,
  emailService,
);

export const passwordHasher = new BcryptpasswordHasher();

// Account Repository
const baseAccountRepository =
  new BaseRepository<AccountDocument, AccountCreateData>(
    AccountModel
  );

export const accountRepository =
  new AccountRepository(baseAccountRepository);
