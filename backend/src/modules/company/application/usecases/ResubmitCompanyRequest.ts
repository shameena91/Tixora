
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IResubmitCompanyRequest } from "../abstraction/IResubmitCompanyRequest";
// status changes to resubmit
export class ResubmitCompanyRequest implements IResubmitCompanyRequest{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}

  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
  MESSAGES.COMPANY_REQUEST_NOT_FOUND,
    ErrorCode.COMPANY_REQUEST_NOT_FOUND

);
    }

companyRequest.resubmit();
console.log("STATUS AFTER RESUBMIT:", companyRequest.status);

    return this.companyRequestRepository.updateStatus(
      id,
      companyRequest.status,
       companyRequest.reviewedBy,
  companyRequest.reviewedAt,
  companyRequest.reviewRemarks,
  companyRequest.rejectionReason
   
    )

}}
