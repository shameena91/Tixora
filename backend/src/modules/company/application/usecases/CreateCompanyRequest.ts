import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyRequest, CompanyRequestStatus } from "../../domain/entities/CompanyRequest";
import { CreateCompanyRequestDto } from "../Validators/CreateCompanyRequestSchema";
import { randomUUID } from "crypto";
import { CompanyLocation } from "../../domain/Value-objects/CompanyLocation";
import { CompanyDocument } from "../../domain/Value-objects/CompanyDocuments";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { RegistrationStep } from "../../../auth/domain/entities/Account";



export class CreateCompanyRequest {
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

    // Company Information completed
    await this.accountRepository.updateRegistrationStep(
      data.accountId,
      RegistrationStep.COMPANY_DETAILS
    );

    return createdCompanyRequest;
  }
}