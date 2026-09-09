import { randomUUID } from "crypto";
import { RegistrationStep } from "../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { CompanyRequest, CompanyRequestStatus } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CreateCompanyRequestDto } from "../Validators/CreateCompanyRequestSchema";
import { ICreateCompanyRequest } from "../abstraction/ICreateCompanyRequest";


// After register admin create company with company details
export class CreateCompanyRequest implements ICreateCompanyRequest{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
    private readonly accountRepository:IAccountRepository
  ) {}

  async execute(

    data: CreateCompanyRequestDto
  ): Promise<CompanyRequest> {



    const companyRequest = new CompanyRequest(
      randomUUID(),
     data.accountId,

      data.companyName,

      data.registrationNumber,

      data.companyEmail,

      data.phone,

      data.yearEstablished,

      data.companyType,

      data.numberOfEmployees,

      CompanyRequestStatus.PENDING,

      data.website,

      data.logo,

      data.description,

      null, // location

      [],   // documents

      new Date(),

      new Date()
    );

     const createdCompanyRequest =
      await this.companyRequestRepository.create(
        companyRequest
      );

    // Company Information completed registration step as companyinformation
    await this.accountRepository.updateRegistrationStep(
      data.accountId,
      RegistrationStep.COMPANY_DETAILS
    );

    return createdCompanyRequest;
  }
}