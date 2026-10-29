
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { IGetAllCompanyRequest } from "../../abstraction/company-requests/IGetAllCompanyRequest";
import { PaginatedCompanyRequestResponseDto } from "../../dto/GetAllCompanyResponseDto";

export class GetAllCompanyRequests implements IGetAllCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(params: {
    page: number;
    limit: number;
    search?: string;
    status?: import("../../../domain/entities/CompanyRequest").CompanyRequestStatus;
  }):Promise<PaginatedCompanyRequestResponseDto> {
    const { page, limit, search, status } = params;

    const matchingAccounts = search?.trim()
      ? await this._accountRepository.findByName(search)
      : undefined;

    const accountIds = matchingAccounts?.map(
      (account) => account.id,
    );

    const result =
      await this._companyRequestRepository.findAllPaginated(
        page,
        limit,
        search,
        status,
        accountIds,
      );

    const data = await Promise.all(
      result.data.map(async (companyRequest) => {
        const account = await this._accountRepository.findById(
          companyRequest.accountId,
        );

        return {
          id: companyRequest.id,
          requestId: companyRequest.requestId,
          requestType: companyRequest.requestType,
          companyName: companyRequest.companyName,
          adminName: account
            ? `${account.firstName} ${account.lastName}`
            : "Unknown",
          status: companyRequest.status,
          submittedAt: companyRequest.submittedAt,
          createdAt: companyRequest.createdAt,
        };
      }),
    );

    return {
      data,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
