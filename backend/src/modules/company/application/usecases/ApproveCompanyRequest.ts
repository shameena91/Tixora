import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { IApproveCompanyRequest } from "../abstraction/IApproveCompanyrequest";
// Change status to approve
export class ApproveCompanyRequest implements IApproveCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}

  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors( MESSAGES.COMPANY_REQUEST_NOT_FOUND, 
        ErrorCode.COMPANY_REQUEST_NOT_FOUND

  );
    }

    companyRequest.approve();

    return this.companyRequestRepository.updateStatus(
      id,
      companyRequest.status
    );
  }
}