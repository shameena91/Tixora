import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";
import { CompanyRequest } from "../../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IMoreInfoCompanyRequest } from "../../abstraction/IMoreInfoCompanyRequest";

export class MoreInfoCompanyrequest implements IMoreInfoCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _createTimeline: ICreateTimeline
  ) {}

  async execute(id: string,  reviewedBy: string,
    remarks: string): Promise<CompanyRequest> {
    const companyRequest = await this._companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
          ErrorCode.COMPANY_REQUEST_NOT_FOUND
,
      );
    }
    companyRequest.requestMoreInfo();
  const reviewedAt = new Date();

await this._createTimeline.execute({
  entityType: TimelineEntityType.COMPANY_REQUEST,
  entityId: companyRequest.id,
  action: "MORE_INFO_REQUIRED",
  description: "More information is required for this company request",
  performedBy: reviewedBy,
  metadata: null,
  createdAt: new Date(),
});


    return this._companyRequestRepository.updateStatus(
   id,
    companyRequest.status,
    reviewedBy,
    reviewedAt,
    remarks,
    null,
      
    );
  }
}
