import { IAccountRepository } from "../../domain/repositories/IAccountRepository";


import { AdminRegistrationRequestDto } from "../validators/AdminRegistrationValidator";
export class AdminRegistration{
    constructor(
        private readonly accountRepository:IAccountRepository
    ){}

    async execute(
        dto:AdminRegistrationRequestDto
    ):Promise<void>{
const account=await this.accountRepository.findByEmail(dto.email)
    
    if (!account){
        throw new Error("Account not found");
    }

     await this.accountRepository.updateAdminDetails(
      account.id,
      dto.firstName,
      dto.lastName,
      dto.phoneNumber,
      dto.designation
    );
}
}