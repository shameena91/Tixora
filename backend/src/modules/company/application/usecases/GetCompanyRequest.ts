import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";

export class GetCompanyRequest {
  constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
  ) {}

  async execute(id: string) {
    const companyRequest =
      await this.companyRequestRepository.findById(id);

    if (!companyRequest) {
      throw new Error("Company request not found");
    }

    return companyRequest;
  }
}