import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { LoginRequestDto } from "../dto/LoginRequestDto";
import { IPasswordHasher } from "../ports/IPasswordHasher";
import { ITokenService } from "../ports/ITokenServices";

export class Login{
    constructor(
        private readonly accountRepository:IAccountRepository,
         private readonly passwordHasher: IPasswordHasher,
         private readonly tokenService: ITokenService
    ){}

    async execute(data:LoginRequestDto)
    {
        const account=await this.accountRepository.findByEmail(data.email)

        if(!account)
        {
            throw new Error ("Invalid Email or Password")
        }

        if (!account.passwordHash) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      data.password,
      account.passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

const accessToken=await this.tokenService.generateAccessToken({
    accountId: account.id,
  email: account.email,
    })
const refreshToken = this.tokenService.generateRefreshToken({
  accountId: account.id,
});
    return {
      accessToken,
    refreshToken,
      account:{
id: account.id,
    email: account.email,
    firstName: account.firstName,
    lastName: account.lastName,
    }
    
  }   
    }
}