import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import { ICreateTimeline } from "../../../timeline/application/abstraction/ICreateTimeline";
import { TimelineEntityType } from "../../../timeline/domain/entities/Timeline";

import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";

import {
  CompanyDocumentType,
  DocumentVerificationStatus,
} from "../../domain/value-objects/CompanyDocuments";

import { IUpdateCompanyDocumentStatusUseCase } from "../abstraction/IUpdateCompanyDocumentStatusUseCase";

export class UpdateCompanyDocumentStatusUseCase
  implements IUpdateCompanyDocumentStatusUseCase
{
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,

    private readonly _createTimeline: ICreateTimeline
  ) {}

  async execute(
    companyRequestId: string,
    documentType: CompanyDocumentType,
    status: DocumentVerificationStatus,
  ): Promise<void> {
    const companyRequest =
      await this._companyRequestRepository.findById(
        companyRequestId
      );

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    companyRequest.updateDocumentStatus(
      documentType,
      status,
    );

    await this._companyRequestRepository.updateDocuments(
      companyRequestId,
      companyRequest.documents,
    );

    // ------------------------------------
    // Create Timeline
    // ------------------------------------
    let action: string | null = null;
    let description = "";

    if (
      status === DocumentVerificationStatus.VERIFIED
    ) {
      action = "DOCUMENT_VERIFIED";
      description = "Company document verified";
    }

    if (
      status === DocumentVerificationStatus.REJECTED
    ) {
      action = "DOCUMENT_REJECTED";
      description = "Company document rejected";
    }

    if (action) {
      await this._createTimeline.execute({
        entityType:
          TimelineEntityType.COMPANY_REQUEST,

        entityId:
          companyRequest.id,

        action,

        description,

        performedBy: null,

        metadata: {
          documentType,
        },

        createdAt: new Date(),
      });
    }
  }
}