import { SendOtp } from "../application/usecases/SendOtp";
import { RedisOtpStore } from "../infrastructure/services/RedisOtpStore";
import { EmailNodemailerService } from "../infrastructure/services/EmailNodemailerService";
import { AuthController } from "../presentation/controllers/AuthController";
import { VarifyOtp } from "../application/usecases/VarifyOtp";
import { CreatePassword } from "../application/usecases/CreatePassword";
import { AccountRepository } from "../infrastructure/database/repositories/AccountRepository";
import { AdminRegistration } from "../application/usecases/AdminRegistration";
import { Login } from "../application/usecases/Login";
import { BcryptpasswordHasher } from "../infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "../infrastructure/services/JwtTokenService";
import { AuthMiddleware } from "../presentation/middlewares/AuthMiddleware";
import { RefreshAccessToken } from "../application/usecases/RefreshAccessToken";


const emailService = new EmailNodemailerService();
const otpStore = new RedisOtpStore();
const accountRepository = new AccountRepository();

const sendOtp = new SendOtp(otpStore,emailService,accountRepository);
const varifyOtp = new VarifyOtp(otpStore);
const createPassword = new CreatePassword(accountRepository);
const adminRegistration =new AdminRegistration(accountRepository)

const passwordHasher = new BcryptpasswordHasher();
const tokenService = new JwtTokenService()

const login=new Login(accountRepository,passwordHasher,tokenService)

const authMiddleware = new AuthMiddleware(tokenService);
const refreshAccessToken = new RefreshAccessToken(
  accountRepository,
  tokenService
);
export const authController = new AuthController(
  sendOtp,
  varifyOtp,
  createPassword,
   adminRegistration,
   login,
   refreshAccessToken
  
  
  
);
export {authMiddleware}