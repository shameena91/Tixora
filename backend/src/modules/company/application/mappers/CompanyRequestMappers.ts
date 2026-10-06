import { Types } from "mongoose";

import { CompanyRequest, CompanyRequestStatus, CompanyType, EmployeeCountRange, RegistrationType } from "../../domain/entities/CompanyRequest";
import { CompanyDocument } from "../../domain/value-objects/CompanyDocuments";
import { CompanyLocation } from "../../domain/value-objects/CompanyLocation";


export interface CompanyRequestDocument {
  _id: Types.ObjectId;

  // Request information
  requestId: string;
  requestType: RegistrationType;

  // Company Admin
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

  // Submission
  submittedAt: Date;

  // Review information
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;
  rejectionReason: string | null;

  createdAt: Date;
  updatedAt: Date;
}
export type CompanyRequestCreateData = Omit<
  CompanyRequestDocument,
  "_id" | "createdAt" | "updatedAt"
>;
export class CompanyRequestMapper {
  static toDomain(doc: CompanyRequestDocument): CompanyRequest {
    return new CompanyRequest(
      doc._id.toString(),

  doc.requestId,
  doc.requestType,

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


  doc.submittedAt,

  doc.reviewedBy
    ? doc.reviewedBy.toString()
    : null,

  doc.reviewedAt ?? null,
  doc.reviewRemarks ?? null,
  doc.rejectionReason ?? null,

  doc.createdAt,
  doc.updatedAt
    );
  }

static toPersistence(
  companyRequest: CompanyRequest
): CompanyRequestCreateData {

  return {
  requestId: companyRequest.requestId,
  requestType: companyRequest.requestType,

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

  submittedAt: companyRequest.submittedAt,

  reviewedBy: companyRequest.reviewedBy,
  reviewedAt: companyRequest.reviewedAt,
  reviewRemarks: companyRequest.reviewRemarks,
  rejectionReason: companyRequest.rejectionReason,
};
}
}