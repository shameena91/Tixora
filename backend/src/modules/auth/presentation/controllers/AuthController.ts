import { SendOtp } from "../../application/usecases/SendOtp";
import { VarifyOtp } from "../../application/usecases/VarifyOtp"
import { VerifyOtpDto } from "../../application/dto/VarifyOtpDto";
import { CreatePassword } from "../../application/usecases/CreatePassword";
import { CreatePasswordRequestDto } from "../../application/dto/CreatePasswordDto";
import { AdminRegistration } from "../../application/usecases/AdminRegistration";
import { AdminRegistrationRequestDto } from "../../application/validators/AdminRegistrationValidator";

export class AuthController {
  constructor(
    private readonly sendOtp: SendOtp,
    private readonly verifyOtp: VarifyOtp,
    private readonly createPassword:CreatePassword,
    private readonly adminRegistration:AdminRegistration
  ) {}

  async sendOtpRequest(email: string): Promise<void> {
    await this.sendOtp.execute(email);
  }

  async verifyOtpRequest(dto: VerifyOtpDto): Promise<boolean> {
    return await this.verifyOtp.execute(dto);
  }

  async createPasswordRequest(dto:CreatePasswordRequestDto):Promise<void> {
return await this.createPassword.execute(dto)
  }
  async adminRegistrationRequest(dto:AdminRegistrationRequestDto){
    return await this.adminRegistration.execute(dto)
  }
}