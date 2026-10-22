import { LoginRequestDto, LoginResponseDto } from "../dto/LoginRequestDto";

export interface ILogin {
  execute(data: LoginRequestDto): Promise<LoginResponseDto>;
}