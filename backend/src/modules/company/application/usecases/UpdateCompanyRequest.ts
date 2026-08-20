import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../domain/repositories/ICompanyRequestRepository";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
// import { UpdateCompanyRequestDto } from "../Validators/updatecompanyrequestSchema";
export class UpdateCompanyRequest{
    constructor(
        private readonly companyRequestRepository:ICompanyRequestRepository
    ){}

async execute(
    id:string,
    data:UpdateCompanyRequestData
){
    const companyRequest=await this.companyRequestRepository.findById(id)
   if (!companyRequest) {
      throw new Error("Company request not found");
    }
  if (
      companyRequest.status !==
      CompanyRequestStatus.MORE_INFO_REQUIRED
    ) {
      throw new Error(
        "Company request cannot be updated"
      );
    }
 return this.companyRequestRepository.updateInfo(
      id,
      data
    );
}}