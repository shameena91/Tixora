import { BaseRepository } from "../../../../infrastructure/repositories/Baserepository";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { MyCompanyRequestStatus } from "../../domain/types/MyCompanyRequest";
import { IGetMyCompanyRequest } from "../abstraction/IGetMyCompanyRequest";
import { CompanyRequestDetails } from "../dto/CompanyrequestDetailsDto";


export class GetMyCompanyRequest implements IGetMyCompanyRequest{
    constructor(
        private readonly companyRepository:ICompanyRequestRepository
    ){}

   async execute(
    accountId: string
  ): Promise<MyCompanyRequestStatus > {

    const companyRequest =
      await this.companyRepository.findByAccountId(accountId);
  if (!companyRequest) {
    throw new AppErrors(
      MESSAGES.COMPANY_REQUEST_NOT_FOUND,
      ErrorCode.COMPANY_REQUEST_NOT_FOUND
    );
  }
  
 return {
  companyRequestId:companyRequest.id,
  status: companyRequest.status,
  reviewRemarks: companyRequest.reviewRemarks,
};
}
}