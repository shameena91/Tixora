import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";
import { CompanyRequest } from "../../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IRejectCompanyRequest } from "../../abstraction/IRejectCompanyRequest";
// Change statusTo reject
export class RejectCompanyRequest implements IRejectCompanyRequest {
  constructor(
    private readonly _companyrequestRepository: ICompanyRequestRepository,
    private readonly _createTimeline: ICreateTimeline,
  ) {}
  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest = await this._companyrequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    companyRequest.reject();

    const updatedCompanyRequest =
      await this._companyrequestRepository.updateStatus(
        id,
        companyRequest.status,
        null,
        new Date(),
        null,
        null,
      );

    await this._createTimeline.execute({
      entityType: TimelineEntityType.COMPANY_REQUEST,

      entityId: companyRequest.id,

      action: "REJECTED",

      description: "Company request rejected",

      performedBy: null,

      metadata: null,

      createdAt: new Date(),
    });

    return updatedCompanyRequest;
  }
}
