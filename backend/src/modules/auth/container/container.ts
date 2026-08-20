import { SendOtp } from "../application/usecases/SendOtp";
import { RedisOtpStore } from "../infrastructure/services/RedisOtpStore";
import { EmailNodemailerService } from "../infrastructure/services/EmailNodemailerService";
import { AuthController } from "../presentation/controllers/AuthController";
import { VarifyOtp } from "../application/usecases/VarifyOtp";
import { CreatePassword } from "../application/usecases/CreatePassword";
import { AccountRepository } from "../infrastructure/database/repositories/AccountRepository";
import { AdminRegistration } from "../application/usecases/AdminRegistration";


const emailService = new EmailNodemailerService();

const otpStore = new RedisOtpStore();

const accountRepository = new AccountRepository();

const sendOtp = new SendOtp(
  otpStore,
  emailService,
  accountRepository
);

const varifyOtp = new VarifyOtp(
  otpStore
);

const createPassword = new CreatePassword(
  accountRepository
);
const adminRegistration =new AdminRegistration(accountRepository)

export const authController = new AuthController(
  sendOtp,
  varifyOtp,
  createPassword,
   adminRegistration
  
);