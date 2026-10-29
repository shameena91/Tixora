import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { CompanyProfileChange } from "../../../domain/entities/CompanyProfileChange";
import type {
  ICompanyChangeRequestRepository,
 
} from "../../../domain/repositories/ICompanyChangeRequestRepository";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanyChangeRequests } from "../../abstraction/companyUpdaterequests/IGetCompanyChangeRequests";
import {  GetCompanyChangeRequestsDTO, GetCompanyChangeRequestsResponseDTO } from "../../dto/GetAllCompanyChnageRequestDto";

export class GetCompanyChangeRequests implements IGetCompanyChangeRequests {
  constructor(
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
      private readonly _companyRepository: ICompanyRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

 async execute(filters: GetCompanyChangeRequestsDTO):Promise<GetCompanyChangeRequestsResponseDTO > {
    const { requests, total } =
      await this._companyChangeRequestRepository.findAllChangeRequests(
        filters,
      );

    const data = await Promise.all(
      requests.map(async (request) => {
        const [company, account] = await Promise.all([
          this._companyRepository.findById(request.companyId),
          this._accountRepository.findById(request.accountId),
        ]);

        
        return {
          id: request.id ?? request.requestId,
          requestId: request.requestId,
          companyId: request.companyId,
          accountId: request.accountId,
          companyName: company?.companyName ?? "Unknown Company",
         adminName:
  `${account?.firstName ?? ""} ${account?.lastName ?? ""}`.trim() ||
  "Unknown Admin",
          updateType:
            request instanceof CompanyProfileChange
              ? ("PROFILE" as const)
              : ("DOCUMENT" as const),
          status: request.status,
          submittedAt: request.submittedAt,
          createdAt: request.createdAt,
        };
      }),
    );

    return {
      requests: data,
      total,
    };
  }
}