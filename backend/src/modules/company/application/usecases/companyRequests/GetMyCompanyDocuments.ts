import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IGetMyCompanyDocuments } from "../../abstraction/company-requests/IGetMyCompanyDocuments.tsIGetMyCompanyDocuments";


import {
  GetMyCompanyDocumentsResponse,
} from "../../dto/GetMyCompanyDocumentsDto";

export class GetMyCompanyDocuments
  implements IGetMyCompanyDocuments
{
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
  ) {}

  async execute(
    accountId: string,
  ): Promise<GetMyCompanyDocumentsResponse> {
    const companyRequest =
      await this._companyRequestRepository.findByAccountId(
        accountId,
      );

    if (!companyRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    return {
      companyRequestId: companyRequest.id,
      documents: companyRequest.documents.map(
        (document) => ({
          documentType: document.documentType,
          fileName: document.fileName,
        }),
      ),
    };
  }
}