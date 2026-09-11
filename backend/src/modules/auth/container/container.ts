
import { RedisOtpStore } from "../infrastructure/services/RedisOtpStore";

import { EmailNodemailerService } from "../infrastructure/services/EmailNodemailerService";

import { VarifyOtp } from "../application/usecases/VarifyOtp";

import { CreatePassword } from "../application/usecases/CreatePassword";

import { AccountRepository } from "../infrastructure/database/repositories/AccountRepository";

import { AdminRegistration } from "../application/usecases/AdminRegistration";

import { Login } from "../application/usecases/Login";

import { BcryptpasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";

import { JwtTokenService } from "../infrastructure/services/JwtTokenService";

import { AuthMiddleware } from "../presentation/middlewares/AuthMiddleware";

import { RefreshAccessToken } from "../application/usecases/RefreshAccessToken";

import { AuthController } from "../presentation/controllers/AuthController";

import { OtpService } from "../infrastructure/services/OtpService";

import { ForgotPassword } from "../application/usecases/ForgotPassword";

import { ResetPassword } from "../application/usecases/ResetPassword";

import { SendRegistrationOtp } from "../application/usecases/SendRegistrationOtp";

import { SendForgotPasswordOtp } from "../application/usecases/SendForgotPassword";
import { Logout } from "../application/usecases/Logout";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { AccountModel } from "../infrastructure/database/models/AccountModel";
import { AccountCreateData, AccountDocument } from "../application/mappers/Accountmapper";
// import { AccountCreateData, AccountDocument } from "../application/mappers/Accountmapper";



const emailService = new EmailNodemailerService();

const otpStore = new RedisOtpStore();

const baseAccountRepository =
  new BaseRepository<AccountDocument, AccountCreateData>(
    AccountModel
  );

const accountRepository =
  new AccountRepository(baseAccountRepository);

const otpService = new OtpService(
  otpStore,
  emailService
);

const sendRegistrationOtp = new SendRegistrationOtp(
  otpService,
  accountRepository
);

const sendForgotPasswordOtp = new SendForgotPasswordOtp(
  otpService,
  accountRepository
);

const forgotPasswordOtp = new ForgotPassword(
  sendForgotPasswordOtp
);

const varifyOtp = new VarifyOtp(otpStore);

const passwordHasher = new BcryptpasswordHasher();

const createPassword = new CreatePassword(
  accountRepository,
  passwordHasher
);

const adminRegistration = new AdminRegistration(
  accountRepository
);

const tokenService = new JwtTokenService();

const login = new Login(
  accountRepository,
  passwordHasher,
  tokenService
);
const logout=new Logout()

const authMiddleware = new AuthMiddleware(tokenService);

const resetPassword = new ResetPassword(
  accountRepository,
  passwordHasher
);

const refreshAccessToken = new RefreshAccessToken(
  accountRepository,
  tokenService
);


export const authController = new AuthController(
  login,
  sendRegistrationOtp,
  varifyOtp,
  createPassword,
  forgotPasswordOtp,
  resetPassword,
  refreshAccessToken,
  adminRegistration,
  logout
);

export { authMiddleware };

