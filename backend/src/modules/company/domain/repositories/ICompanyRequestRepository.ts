

import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { CompanyRequestListItemDto } from "../../application/dto/CompanyRequestListItemDto";
import { CompanyRequest, CompanyRequestStatus } from "../entities/CompanyRequest";
import { CompanyLogoFile } from "../types/CompanyDocumentFile";
import { UpdateCompanyRequestData } from "../types/UpdateCompanyRequesstData";
import { CompanyDocument } from "../value-objects/CompanyDocuments";
import { CompanyLocation } from "../value-objects/CompanyLocation";
// import { UpdateCompanyRequestDto } from "../../application/Validators/updatecompanyrequestSchema";

 export interface ICompanyRequestRepository {


   create(
      company: CompanyRequest
    ): Promise<CompanyRequest>;
  
    findById(
      id: string
    ): Promise<CompanyRequest | null>;
  
    findAll(): Promise<CompanyRequest[]>;
  
findByAccountId(accountId:string):Promise<CompanyRequest|null>
   findByPhone(phone: string): Promise<CompanyRequest | null>;
     findByEmail(email: string): Promise<CompanyRequest | null>;

updateInfo(
    id: string,
    data: UpdateCompanyRequestData
  ): Promise<CompanyRequest>;
 updateStatus(
   id: string,
  status: CompanyRequestStatus,
  reviewedBy: string|null,
  reviewedAt: Date |null,
  reviewRemarks: string | null,
  rejectionReason: string | null

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