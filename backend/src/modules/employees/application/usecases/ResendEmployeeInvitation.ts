import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICreateEmployeeInvitation } from "../abstarction/ICreateEmployeeInvitation";
import { IResendEmployeeInvitation } from "../abstarction/IResendEmployeeInvitation";

export class ResendEmployeeInvitationUseCase implements IResendEmployeeInvitation{
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly createInvitationUseCase: ICreateEmployeeInvitation,
  ) {}

  async execute(accountId: string,
  invitedByAccountId: string  
  ): Promise<void> {
   

 await this.createInvitationUseCase.execute(accountId,invitedByAccountId);

  
  }
}