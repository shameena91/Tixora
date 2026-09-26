import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IGetAllCompanyRequest } from "../abstraction/IGetAllCompanyRequest";

export class GetAllCompanyRequests
  implements IGetAllCompanyRequest
{
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
     private readonly _accountRepository: IAccountRepository


) {}

   async execute() {
    const companyRequests =
      await this._companyRequestRepository.findAll();

    const companyRequestsWithAdmin =
      await Promise.all(
        companyRequests.map(async (companyRequest) => {
          const account =
            await this._accountRepository.findById(
              companyRequest.accountId
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
        })
      );

    return companyRequestsWithAdmin;
  }
}