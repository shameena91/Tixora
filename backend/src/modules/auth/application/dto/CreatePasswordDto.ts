export interface CreatePasswordRequestDto{
    email: string;
  password: string;
  confirmPassword: string;
}
export interface CreatePasswordResponseDto {
  message: string;
}