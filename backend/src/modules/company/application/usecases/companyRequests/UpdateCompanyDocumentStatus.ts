import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICreateTimeline } from "../../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../../timeline/domain/entities/Timeline";

import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";

import {
  CompanyDocumentType,
  DocumentVerificationStatus,
} from "../../../domain/value-objects/CompanyDocuments";

import { IUpdateCompanyDocumentStatusUseCase } from "../../abstraction/company-requests/IUpdateCompanyDocumentStatusUseCase";

export class UpdateCompanyDocumentStatusUseCase
  implements IUpdateCompanyDocumentStatusUseCase
{
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _createTimeline: ICreateTimeline,
  ) {}

  async execute(
    companyRequestId: string,
    documentType: CompanyDocumentType,
    status: DocumentVerificationStatus,
    rejectionReason?: string,
  ): Promise<void> {
    const companyRequest =
      await this._companyRequestRepository.findById(companyRequestId);

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (
      status === DocumentVerificationStatus.REJECTED &&
      !rejectionReason?.trim()
    ) {
      throw new Error("Rejection reason is required");
    }

    const normalizedReason =
      status === DocumentVerificationStatus.REJECTED
        ? rejectionReason!.trim()
        : null;

    companyRequest.updateDocumentStatus(
      documentType,
      status,
      normalizedReason,
    );

    await this._companyRequestRepository.updateDocuments(
      companyRequestId,
      companyRequest.documents,
    );

    const action =
      status === DocumentVerificationStatus.VERIFIED
        ? "DOCUMENT_VERIFIED"
        : status === DocumentVerificationStatus.REJECTED
          ? "DOCUMENT_REJECTED"
          : null;

    if (action) {
      await this._createTimeline.execute({
        entityType: TimelineEntityType.COMPANY_REQUEST,
        entityId: companyRequest.id,
        action,
        description:
          status === DocumentVerificationStatus.VERIFIED
            ? "Company document verified"
            : "Company document rejected",
        performedBy: null,
        metadata: {
          documentType,
          ...(normalizedReason ? { rejectionReason: normalizedReason } : {}),
        },
        createdAt: new Date(),
      });
    }
  }
}