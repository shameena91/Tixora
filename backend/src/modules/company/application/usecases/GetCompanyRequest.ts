import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IGetCompanyRequest } from "../abstraction/IGetCompanyRequest";
// Review before final submission
export class GetCompanyRequest implements IGetCompanyRequest{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}

  async execute(id: string) {
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
  throw new AppErrors(
    MESSAGES.COMPANY_REQUEST_NOT_FOUND,
      ErrorCode.COMPANY_REQUEST_NOT_FOUND

  );
}

    return companyRequest;
  }
}