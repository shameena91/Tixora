import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { AccountStatus } from "../../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";
import { CompanyRequest } from "../../../domain/entities/CompanyRequest";
import { CompanyRequestStatus } from "../../../domain/enums/CompanyRequestStatus";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IApproveCompanyRequest } from "../../abstraction/IApproveCompanyrequest";
import { ICreateCompany } from "../../abstraction/ICreateCompany";

export class ApproveCompanyRequest implements IApproveCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,

    private readonly _createCompany: ICreateCompany,

    private readonly _createTimeline: ICreateTimeline,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(id: string, reviewedBy: string): Promise<CompanyRequest> {
    const companyRequest = await this._companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    companyRequest.approve();

    await this._createCompany.execute({
      accountId: companyRequest.accountId,

      companyName: companyRequest.companyName,

      registrationNumber: companyRequest.registrationNumber,

      companyEmail: companyRequest.companyEmail,

      phone: companyRequest.phone,

      yearEstablished: companyRequest.yearEstablished,

      companyType: companyRequest.companyType,

      numberOfEmployees: companyRequest.numberOfEmployees,

      website: companyRequest.website,

      logo: companyRequest.logo,

      description: companyRequest.description,

      location: companyRequest.location,
    });
    await this._accountRepository.updateStatus(
      companyRequest.accountId,
      AccountStatus.ACTIVE,
    );
    const updatedCompanyRequest =
      await this._companyRequestRepository.updateStatus(
        id,
        CompanyRequestStatus.APPROVED,
        reviewedBy,
        new Date(),
        null,
        null,
      );

    await this._createTimeline.execute({
      entityType: TimelineEntityType.COMPANY_REQUEST,

      entityId: companyRequest.id,

      action: "APPROVED",

      description: "Company request approved",

      performedBy: reviewedBy,

      metadata: null,

      createdAt: new Date(),
    });

    return updatedCompanyRequest;
  }
}
