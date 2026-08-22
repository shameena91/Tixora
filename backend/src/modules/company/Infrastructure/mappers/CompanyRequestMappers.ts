import { Types } from "mongoose";

import { CompanyRequest, CompanyRequestStatus, CompanyType, EmployeeCountRange } from "../../domain/entities/CompanyRequest";
import { CompanyDocument } from "../../domain/Value-objects/CompanyDocuments";
import { CompanyLocation } from "../../domain/Value-objects/CompanyLocation";


export interface CompanyRequestDocument {
  _id: Types.ObjectId;
  accountId: string;
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: number | null;
  companyType: CompanyType;
  numberOfEmployees: EmployeeCountRange;
  status: CompanyRequestStatus;
  website: string | null;
  logo: string | null;
  description: string | null;
 location: CompanyLocation | null;
  documents: CompanyDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyRequestMapper {
  static toDomain(doc: CompanyRequestDocument): CompanyRequest {
    return new CompanyRequest(
      doc._id.toString(),
      doc.accountId,
      doc.companyName,
      doc.registrationNumber,
      doc.companyEmail,
      doc.phone,
      doc.yearEstablished,
      doc.companyType,
      doc.numberOfEmployees,
      doc.status,
      doc.website,
      doc.logo,
      doc.description,
      doc.location,
      doc.documents,
      doc.createdAt,
      doc.updatedAt
    );
  }

  static toPersistence(companyRequest: CompanyRequest) {
  return {
    accountId: companyRequest.accountId,
    companyName: companyRequest.companyName,
    registrationNumber: companyRequest.registrationNumber,
    companyEmail: companyRequest.companyEmail,
    phone: companyRequest.phone,
    yearEstablished: companyRequest.yearEstablished,
    companyType: companyRequest.companyType,
    numberOfEmployees: companyRequest.numberOfEmployees,
    status: companyRequest.status,
    website: companyRequest.website,
    logo: companyRequest.logo,
    description: companyRequest.description,
    location: companyRequest.location,
    documents: companyRequest.documents,
    createdAt: companyRequest.createdAt,
    updatedAt: companyRequest.updatedAt,
  };
}
}