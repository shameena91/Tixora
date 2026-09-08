

import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { CompanyRequest, CompanyRequestStatus } from "../entities/CompanyRequest";
import { UpdateCompanyRequestData } from "../types/UpdateCompanyRequesstData";
import { CompanyDocument } from "../value-objects/CompanyDocuments";
import { CompanyLocation } from "../value-objects/CompanyLocation";
// import { UpdateCompanyRequestDto } from "../../application/Validators/updatecompanyrequestSchema";

 export interface ICompanyRequestRepository extends IBaseRepository<CompanyRequest>{
findByAccountId(accountId:string):Promise<CompanyRequest|null>
  updateInfo(
    id: string,
    data: UpdateCompanyRequestData
  ): Promise<CompanyRequest>;
 updateStatus(
    id: string,
    status: CompanyRequestStatus
  ): Promise<CompanyRequest>;
updateLocation(
  id: string,
  location: CompanyLocation
): Promise<CompanyRequest>;
updateDocuments(
  id: string,
  documents: CompanyDocument[]
): Promise<CompanyRequest>;
 }