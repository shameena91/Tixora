import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyRequest, CompanyRequestStatus } from "../../domain/entities/CompanyRequest";
import { CreateCompanyRequestDto } from "../Validators/CreateCompanyRequestSchema";
import { randomUUID } from "crypto";
import { CompanyLocation } from "../../domain/Value-objects/CompanyLocation";
import { CompanyDocument } from "../../domain/Value-objects/CompanyDocuments";



export class CreateCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}



  
  async execute(

    data: CreateCompanyRequestDto
  ): Promise<CompanyRequest> {

const documents = data.documents.map(
  (document) =>
    new CompanyDocument(
      document.documentType,
      document.fileName,
      document.fileUrl
    )
);


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
      new CompanyLocation(
        data.location.address,
        data.location.city,
        data.location.state,
        data.location.country,
        data.location.postalCode
      ),
      documents,
      new Date(),
      new Date()
    );

    return this.companyRequestRepository.create(
      companyRequest
    );
  }
}