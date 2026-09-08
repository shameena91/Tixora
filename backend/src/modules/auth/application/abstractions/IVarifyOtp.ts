import { VerifyOtpDto } from "../dto/VarifyOtpDto";

export interface IVarifyOtp {
  execute(dto: VerifyOtpDto): Promise<boolean>;
}