export interface LoginRequestDto{
email:string,
password:string
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  account: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}