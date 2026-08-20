import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";

export class MoreInfoCompanyrequest{
    constructor(
    private readonly companyRequestRepository: ICompanyRequestRepository
    ){}

    async execute(id:string):Promise<CompanyRequest>{
        const companyRequest=await this.companyRequestRepository.findById(id)

         if (!companyRequest) {
      throw new Error("Company request not found");
    }
    companyRequest.requestMoreInfo();

    return this.companyRequestRepository.updateStatus(
      id,
      companyRequest.status
    );
  }
    
}