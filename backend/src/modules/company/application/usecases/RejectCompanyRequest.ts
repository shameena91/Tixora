import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";

export class RejectCompanyRequest{
    constructor(
        private readonly companyrequestRepository:ICompanyRequestRepository

    ){}
async execute(id:string):Promise<CompanyRequest>{
    const companyRequest=await this.companyrequestRepository.findById(id)

    if(!companyRequest) {
    throw new Error("Companu REquest not found")
    }

    companyRequest.reject()

    return this.companyrequestRepository.updateStatus(
        id,
        companyRequest.status)
}






}