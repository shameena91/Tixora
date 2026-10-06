import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";

import { CompanyRequest } from "../../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";

import { IResubmitCompanyRequest } from "../../abstraction/company-requests/IResubmitCompanyRequest";

// Status changes to resubmit
export class ResubmitCompanyRequest implements IResubmitCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,

    private readonly _createTimeline: ICreateTimeline,
  ) {}

  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest = await this._companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    companyRequest.resubmit();

    console.log("STATUS AFTER RESUBMIT:", companyRequest.status);

    const updatedCompanyRequest =
      await this._companyRequestRepository.updateStatus(
        id,
        companyRequest.status,
        companyRequest.reviewedBy,
        companyRequest.reviewedAt,
        companyRequest.reviewRemarks,
        companyRequest.rejectionReason,
      );

    await this._createTimeline.execute({
      entityType: TimelineEntityType.COMPANY_REQUEST,

      entityId: companyRequest.id,

      action: "RESUBMITTED",

      description: "Company request resubmitted",

      performedBy: null,

      metadata: null,

      createdAt: new Date(),
    });

    return updatedCompanyRequest;
  }
}
