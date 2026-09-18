import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IMoreInfoCompanyRequest  } from "../abstraction/IMoreInfoCompanyRequest";

export class MoreInfoCompanyrequest implements IMoreInfoCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
  ) {}

  async execute(id: string,  reviewedBy: string,
    remarks: string): Promise<CompanyRequest> {
    const companyRequest = await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
          ErrorCode.COMPANY_REQUEST_NOT_FOUND
,
      );
    }
    companyRequest.requestMoreInfo();
  const reviewedAt = new Date();
    return this.companyRequestRepository.updateStatus(
   id,
    companyRequest.status,
    reviewedBy,
    reviewedAt,
    remarks,
    null,
      
    );
  }
}
