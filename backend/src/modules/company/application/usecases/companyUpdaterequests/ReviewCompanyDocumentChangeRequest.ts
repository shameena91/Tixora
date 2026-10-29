import {
  CompanyDocumentChangeStatus,
} from "../../../domain/entities/CompanyDocumentChange";

import type {
  ICompanyChangeRequestRepository,
} from "../../../domain/repositories/ICompanyChangeRequestRepository";


import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import type {
  IReviewCompanyDocumentChangeRequest,
} from "../../abstraction/companyUpdaterequests/IReviewCompanyDocumentChangeRequest";
import { ReviewCompanyDocumentChangeRequestDTO, ReviewCompanyDocumentChangeResponseDTO } from "../../dto/ReviewCompanyDocumentChangeDTO";

export class ReviewCompanyDocumentChangeRequest
  implements IReviewCompanyDocumentChangeRequest
{
  constructor(
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
  ) {}

  async execute(
    requestId: string,
    reviewerId: string,
    dto: ReviewCompanyDocumentChangeRequestDTO,
  ): Promise<ReviewCompanyDocumentChangeResponseDTO> {
    const request =
      await this._companyChangeRequestRepository.findByRequestId(
        requestId,
      );

    if (!request) {
      throw new AppErrors(
        MESSAGES.COMPANY_DOCUMENT_CHANGE_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_DOCUMENT_CHANGE_REQUEST_NOT_FOUND,
      );
    }

    if (request.status !== CompanyDocumentChangeStatus.PENDING) {
      throw new AppErrors(
        MESSAGES.COMPANY_DOCUMENT_CHANGE_REQUEST_ALREADY_REVIEWED,
        ErrorCode.COMPANY_DOCUMENT_CHANGE_REQUEST_ALREADY_REVIEWED,
      );
    }

    if (dto.decision === "APPROVE") {
      request.approve(reviewerId);
    } else {
      request.reject(
        reviewerId,
        dto.remarks?.trim() || "Document change request rejected",
      );
    }

    const updatedRequest =
      await this._companyChangeRequestRepository.updateDocumentChange(
        request,
      );

    if (!updatedRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_DOCUMENT_CHANGE_REQUEST_UPDATE_FAILED,
        ErrorCode.COMPANY_DOCUMENT_CHANGE_REQUEST_UPDATE_FAILED,
      );
    }

    return {
      requestId: updatedRequest.requestId,
      companyId: updatedRequest.companyId,
      accountId: updatedRequest.accountId,
      documentType: updatedRequest.documentType,
      status: updatedRequest.status,
      reason: updatedRequest.reason,
      reviewedBy: updatedRequest.reviewedBy,
      reviewedAt: updatedRequest.reviewedAt,
      reviewRemarks: updatedRequest.reviewRemarks,
      submittedAt: updatedRequest.submittedAt,
    };
  }
}