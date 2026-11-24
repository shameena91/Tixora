import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { IEmployeeInvitationRepository } from "../../domain/repositories/IEmployeeInvitationRepository";
import { IVarifyEmployeeInvitation } from "../abstarction/IVarifyEmployeeInvitation";
import { ITokenService } from "../ports/ITokenService";

export class VarifyEmployeeInvitation implements IVarifyEmployeeInvitation{
    constructor(    
        private readonly invitationRepository: IEmployeeInvitationRepository,
    private readonly tokenService: ITokenService
){}
    async execute(token:string):Promise<{valid:boolean}>{
if (!token) {
  throw new AppErrors(
    "Invitation token is required",
    ErrorCode.INVALID_INVITATION_TOKEN
  );
}

const tokenHash=this.tokenService.hashToken(token)

const invitation=await this.invitationRepository.findByTokenHash(tokenHash)
    
if(!invitation){
    throw new AppErrors("Invalid invitation token",
        ErrorCode.INVALID_INVITATION_TOKEN);
}

 if (!invitation.isValid()) {
      throw new AppErrors("Invitation link is expired or already used",
        ErrorCode.INVITATION_EXPIRED_OR_ALREADY_USED);
    }

    return { valid: true };

}
}