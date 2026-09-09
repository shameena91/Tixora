import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
import { IUpdateCompanyRequest } from "../abstraction/IUpdateCompanyRequest";
// import { UpdateCompanyRequestDto } from "../Validators/updatecompanyrequestSchema";

// after admin ask for more info can edit our details

export class UpdateCompanyRequest implements IUpdateCompanyRequest{
    constructor(
        private readonly companyRequestRepository:ICompanyRequestRepository
    ){}

async execute(
    id:string,
    data:UpdateCompanyRequestData
){
    const companyRequest=await this.companyRequestRepository.findById(id)
   if (!companyRequest) {
  throw new AppErrors(
    MESSAGES.COMPANY_REQUEST_NOT_FOUND,
      ErrorCode.COMPANY_REQUEST_NOT_FOUND

  );
}
  if (
      companyRequest.status !==
      CompanyRequestStatus.MORE_INFO_REQUIRED
    ) {
     throw new AppErrors(
  MESSAGES.COMPANY_REQUEST_CANNOT_BE_UPDATED,
  ErrorCode.COMPANY_REQUEST_CANNOT_BE_UPDATED
);
    }
 return this.companyRequestRepository.updateInfo(
      id,
      data
    );
}}