import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { CompanyRequest } from "../../domain/entities/CompanyRequest";

export class ApproveCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}

  async execute(id: string): Promise<CompanyRequest> {
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new Error("Company request not found");
    }

    companyRequest.approve();

    return this.companyRequestRepository.updateStatus(
      id,
      companyRequest.status
    );
  }
}