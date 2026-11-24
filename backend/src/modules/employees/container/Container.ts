
import { accountRepository, emailService, passwordHasher } from "../../auth/container/dependencies";
import { companyRepository } from "../../payments/container/Container";
import { AcceptEmployeeInvitation } from "../application/usecases/AcceptEmployeeInvitation";
import { CreateEmployeeInvitationUseCase } from "../application/usecases/CreateEmployeeInvitation";
import { ResendEmployeeInvitationUseCase } from "../application/usecases/ResendEmployeeInvitation";
import { VarifyEmployeeInvitation } from "../application/usecases/VarifyEmployeeInvitation";
import { EmployeeInvitationRepository } from "../infrastructure/database/repositotres/EmployeeInvitationRepository";
import { TokenService } from "../infrastructure/services/TokenService";
import { EmployeeController } from "../presentation/controllers/EmployeeController";
import { EmployeeUseCaseFactory } from "./EmployeeUseCaseFactory";




export const employeeInvitationRepository=new EmployeeInvitationRepository()

export const tokenService=new TokenService()
export const createEmployeeInvitation=new CreateEmployeeInvitationUseCase(
accountRepository,
employeeInvitationRepository,
emailService,
tokenService,
companyRepository
)
export const employeeUsecaseFactory = new EmployeeUseCaseFactory(
  createEmployeeInvitation
);
export const varifyEmployeeInvitation=new VarifyEmployeeInvitation(
  employeeInvitationRepository,
  tokenService
)

export const acceptEmployeeInvitation=new AcceptEmployeeInvitation(

employeeInvitationRepository,
accountRepository,
tokenService,
passwordHasher,
employeeUsecaseFactory


)


export const resendEmployeeInvitation=new ResendEmployeeInvitationUseCase(
accountRepository,
createEmployeeInvitation
)

export const employeeController = new EmployeeController(
  employeeUsecaseFactory,
    varifyEmployeeInvitation,
    acceptEmployeeInvitation,
    resendEmployeeInvitation
);