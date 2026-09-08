import { CreatePasswordRequestDto } from "../dto/CreatePasswordDto";

export interface ICreatePassword {
  execute(
    passwordDto: CreatePasswordRequestDto
  ): Promise<void>;
}