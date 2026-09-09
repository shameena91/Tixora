import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IRejectCompanyRequest } from "../abstraction/IRejectCompanyRequest";
// Change statusTo reject
export class RejectCompanyRequest  implements IRejectCompanyRequest{
  constructor(
    private readonly companyrequestRepository: ICompanyRequestRepository,
  ) {}
  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest = await this.companyrequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
          ErrorCode.COMPANY_REQUEST_NOT_FOUND
,
      );
    }

    companyRequest.reject();

    return this.companyrequestRepository.updateStatus(
      id,
      companyRequest.status,
    );
  }
}
