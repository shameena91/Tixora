import { CompanyProfileChange } from "../entities/CompanyProfileChange";
import { CompanyDocumentChange } from "../entities/CompanyDocumentChange";
import {  CompanyChangeRequestListResult, GetCompanyChangeRequestsDTO } from "../../application/dto/GetAllCompanyChnageRequestDto";





export interface ICompanyChangeRequestRepository {
  createProfileChange(
    change: CompanyProfileChange,
  ): Promise<CompanyProfileChange>;

  createDocumentChange(
    change: CompanyDocumentChange,
  ): Promise<CompanyDocumentChange>;
findByRequestId(
  requestId: string,
): Promise<CompanyProfileChange | CompanyDocumentChange | null>;

  findProfileByRequestId(
    requestId: string,
  ): Promise<CompanyProfileChange | null>;

  findDocumentByRequestId(
    requestId: string,
  ): Promise<CompanyDocumentChange | null>;

  updateProfileChange(
    change: CompanyProfileChange,
  ): Promise<CompanyProfileChange | null>;

  updateDocumentChange(
    change: CompanyDocumentChange,
  ): Promise<CompanyDocumentChange | null>;

   findAllChangeRequests(
    filters: GetCompanyChangeRequestsDTO,
  ): Promise<CompanyChangeRequestListResult>;
}