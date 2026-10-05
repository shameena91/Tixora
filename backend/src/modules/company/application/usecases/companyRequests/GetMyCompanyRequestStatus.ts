import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { MyCompanyRequestStatus } from "../../../domain/types/MyCompanyRequest";
import { IGetMyCompanyRequestStatus } from "../../abstraction/IGetMyCompanyRequestStatus";

export class GetMyCompanyRequestStatus implements IGetMyCompanyRequestStatus {
  constructor(private readonly _companyRepository: ICompanyRequestRepository) {}

  async execute(accountId: string): Promise<MyCompanyRequestStatus> {
    const companyRequest =
      await this._companyRepository.findByAccountId(accountId);
    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return {
      companyRequestId: companyRequest.id,
      status: companyRequest.status,
      reviewRemarks: companyRequest.reviewRemarks,
    };
  }
}
