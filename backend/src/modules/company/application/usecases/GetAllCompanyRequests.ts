import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { IGetAllCompanyRequest } from "../abstraction/IGetAllCompanyRequest";

export class GetAllCompanyRequests
  implements IGetAllCompanyRequest
{
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository,
     private readonly accountRepository: IAccountRepository


) {}

   async execute() {
    const companyRequests =
      await this.companyRequestRepository.findAll();

    const companyRequestsWithAdmin =
      await Promise.all(
        companyRequests.map(async (companyRequest) => {
          const account =
            await this.accountRepository.findById(
              companyRequest.accountId
            );

          return {
            id: companyRequest.id,
            companyName: companyRequest.companyName,
            adminName: account
              ? `${account.firstName} ${account.lastName}`
              : "Unknown",
            status: companyRequest.status,
            createdAt: companyRequest.createdAt,
          };
        })
      );

    return companyRequestsWithAdmin;
  }
}