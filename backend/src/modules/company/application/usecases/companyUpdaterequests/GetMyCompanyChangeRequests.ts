import type { ICompanyChangeRequestRepository } from "../../../domain/repositories/ICompanyChangeRequestRepository";
import type { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import type { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import type { IFileStoragePort } from "../../ports/IFileStoragePort";
import type { IGetMyCompanyChangeRequests } from "../../abstraction/companyUpdaterequests/IGetMyCompanyChangeRequests";

import type {
  ProfileChangeRequestDetailsDTO,
  DocumentChangeRequestDetailsDTO,
} from "../../dto/GetCompanyChangeRequestByIdDTO";

export class GetMyCompanyChangeRequests
  implements IGetMyCompanyChangeRequests
{
  constructor(
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
    private readonly _companyRepository: ICompanyRepository,
    private readonly _accountRepository: IAccountRepository,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    accountId: string,
  ): Promise<
    (ProfileChangeRequestDetailsDTO | DocumentChangeRequestDetailsDTO)[]
  > {
    const requests =
      await this._companyChangeRequestRepository.findByAccountId(
        accountId,
      );
console.log("Requyests cvhnageeeeee",requests)
    if (requests.length === 0) {
      return [];
    }

    const [company, account] = await Promise.all([
      this._companyRepository.findById(requests[0].companyId),
      this._accountRepository.findById(accountId),
    ]);

    const commonDetails = {
      companyName: company?.companyName ?? "Unknown Company",
      adminName:
        `${account?.firstName ?? ""} ${account?.lastName ?? ""}`.trim() ||
        "Unknown Admin",
    };

    return Promise.all(
      requests.map(async (request) => {
        const commonRequestDetails = {
          ...commonDetails,
          id: request.id,
          requestId: request.requestId,
          companyId: request.companyId,
          accountId: request.accountId,
          submittedAt: request.submittedAt,
          reviewedBy: request.reviewedBy,
          reviewedAt: request.reviewedAt,
          reviewRemarks: request.reviewRemarks,
          createdAt: request.createdAt,
          updatedAt: request.updatedAt,
        };

        if ("changes" in request) {
          return {
            ...commonRequestDetails,
            updateType: "PROFILE" as const,
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

        const [oldDocumentUrl, newDocumentUrl] = await Promise.all([
          request.oldDocumentKey
            ? this._fileStorage.getSignedUrl(request.oldDocumentKey)
            : Promise.resolve(null),
          this._fileStorage.getSignedUrl(request.newDocumentKey),
        ]);

        return {
          ...commonRequestDetails,
          updateType: "DOCUMENT" as const,
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
      }),
    );
  }

  private getFileName(key: string): string {
    const fileName = key.split("/").pop();

    return fileName?.replace(/^\d+-/, "") ?? key;
  }
}