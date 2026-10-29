import type {
  ICompanyChangeRequestRepository,
} from "../../../domain/repositories/ICompanyChangeRequestRepository";

import type {
  ICompanyRepository,
} from "../../../domain/repositories/ICompanyRepository";

import type {
  IAccountRepository,
} from "../../../../auth/domain/repositories/IAccountRepository";

import type {
  IFileStoragePort,
} from "../../ports/IFileStoragePort";

import type {
  IGetCompanyChangeRequestById,
} from "../../abstraction/companyUpdaterequests/IGetCompanyChangeRequestById";


import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { GetCompanyChangeRequestByIdResponseDTO } from "../../dto/GetCompanyChangeRequestByIdDTO";

export class GetCompanyChangeRequestById
  implements IGetCompanyChangeRequestById
{
  constructor(
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
    private readonly _companyRepository: ICompanyRepository,
    private readonly _accountRepository: IAccountRepository,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    requestId: string,
  ): Promise<GetCompanyChangeRequestByIdResponseDTO> {
    const request =
      await this._companyChangeRequestRepository.findByRequestId(
        requestId,
      );

    if (!request) {
      throw new AppErrors(
        MESSAGES.COMPANY_UPDATE_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_UPDATE_REQUEST_NOT_FOUND,
      );
    }

    const [company, account] = await Promise.all([
      this._companyRepository.findById(request.companyId),
      this._accountRepository.findById(request.accountId),
    ]);

    const commonDetails = {
      id: request.id,
      requestId: request.requestId,
      companyId: request.companyId,
      accountId: request.accountId,
      companyName: company?.companyName ?? "Unknown Company",
      adminName:
        `${account?.firstName ?? ""} ${account?.lastName ?? ""}`.trim() ||
        "Unknown Admin",
      submittedAt: request.submittedAt,
      reviewedBy: request.reviewedBy,
      reviewedAt: request.reviewedAt,
      reviewRemarks: request.reviewRemarks,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };

    
    if ("changes" in request) {
      return {
        ...commonDetails,
        updateType: "PROFILE",
        status: request.status,
        changes: request.changes.map((change) => ({
          field: change.field,
          oldValue: change.oldValue,
          newValue: change.newValue,
          reason: change.reason,
          status: change.status,
          reviewRemarks: change.reviewRemarks,
        })),
      };
    }

  
    const oldDocumentUrl = request.oldDocumentKey
      ? await this._fileStorage.getSignedUrl(
          request.oldDocumentKey,
        )
      : null;

    const newDocumentUrl =
      await this._fileStorage.getSignedUrl(
        request.newDocumentKey,
      );

    return {
      ...commonDetails,
      updateType: "DOCUMENT",
      status: request.status,
      documentType: request.documentType,
      oldDocumentKey: request.oldDocumentKey,
      newDocumentKey: request.newDocumentKey,
    oldDocumentName: request.oldDocumentKey
  ? this.getFileName(request.oldDocumentKey)
  : null,

newDocumentName: this.getFileName(request.newDocumentKey),
      
      oldDocumentUrl,
      newDocumentUrl,
      reason: request.reason,
    };
  }

 private getFileName(key: string): string {
  const fileName = key.split("/").pop();

  return fileName?.replace(/^\d+-/, "") ?? key;
}
}