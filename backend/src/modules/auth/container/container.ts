
import { VarifyOtp } from "../application/usecases/VarifyOtp";
import { CreatePassword } from "../application/usecases/CreatePassword";
import { AdminRegistration } from "../application/usecases/AdminRegistration";
import { Login } from "../application/usecases/Login";
import { JwtTokenService } from "../infrastructure/services/JwtTokenService";
import { AuthMiddleware } from "../presentation/middlewares/AuthMiddleware";
import { RefreshAccessToken } from "../application/usecases/RefreshAccessToken";
import { AuthController } from "../presentation/controllers/AuthController";
import { ForgotPassword } from "../application/usecases/ForgotPassword";
import { ResetPassword } from "../application/usecases/ResetPassword";
import { SendRegistrationOtp } from "../application/usecases/SendRegistrationOtp";
import { SendForgotPasswordOtp } from "../application/usecases/SendForgotPassword";
import { Logout } from "../application/usecases/Logout";

import { employeeUsecaseFactory } from "../../employees/container/Container";

import {
  accountRepository,
  otpStore,
  otpService,
  passwordHasher,
} from "./dependencies";

// OTP
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

// Password
const createPassword = new CreatePassword(
  accountRepository,
  passwordHasher
);

const adminRegistration = new AdminRegistration(
  accountRepository
);

// Token
const tokenService = new JwtTokenService();

// Login
const login = new Login(
  accountRepository,
  passwordHasher,
  tokenService,
  employeeUsecaseFactory,
);

const logout = new Logout();

const authMiddleware = new AuthMiddleware(tokenService);

const resetPassword = new ResetPassword(
  accountRepository,
  passwordHasher
);

const refreshAccessToken = new RefreshAccessToken(
  accountRepository,
  tokenService,
  employeeUsecaseFactory

);

// Controller
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
