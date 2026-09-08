import { LoginRequestDto } from "../dto/LoginRequestDto";

export interface ILogin {
  execute(data: LoginRequestDto): Promise<{
    accessToken: string;
    refreshToken: string;
    account: any;
  }>;
}