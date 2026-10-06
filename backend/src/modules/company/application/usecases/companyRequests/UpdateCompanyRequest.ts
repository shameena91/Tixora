import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { CompanyRequestStatus } from "../../../domain/enums/CompanyRequestStatus";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { UpdateCompanyRequestData } from "../../../domain/types/UpdateCompanyRequesstData";
import { IUpdateCompanyRequest } from "../../abstraction/company-requests/IUpdateCompanyRequest";

export class UpdateCompanyRequest implements IUpdateCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
  ) {}

  async execute(id: string, data: UpdateCompanyRequestData) {
    const companyRequest = await this._companyRequestRepository.findById(id);
    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }
    if (companyRequest.status !== CompanyRequestStatus.MORE_INFO_REQUIRED) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_CANNOT_BE_UPDATED,
        ErrorCode.COMPANY_REQUEST_CANNOT_BE_UPDATED,
      );
    }
    return this._companyRequestRepository.updateInfo(id, data);
  }
}
