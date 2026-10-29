import { CompanyProfileChange, CompanyProfileChangeStatus, CompanyProfileField, CompanyProfileFieldChangeStatus, ProfileFieldChange } from "../../domain/entities/CompanyProfileChange";




export interface ProfileFieldChangeDocument {
  field: CompanyProfileField;
  oldValue: string | null;
  newValue: string;
  reason: string;
  status: CompanyProfileFieldChangeStatus;
  reviewRemarks: string | null;
}
export interface CompanyProfileChangeMapperData {
    _id: string;
  requestId: string;
  companyId: string;
  accountId: string;

  changeType: "PROFILE";
  profileChanges: ProfileFieldChange[];

  status: CompanyProfileChangeStatus;
  submittedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;

  createdAt: Date;
  updatedAt: Date;
}
export type CompanyProfileChangeCreateData = Omit<
  CompanyProfileChangeMapperData,
  "_id" | "createdAt" | "updatedAt"
>;

export class CompanyProfileChangeMapper {
  static toDomain(
    doc: CompanyProfileChangeMapperData,
  ): CompanyProfileChange {
    return new CompanyProfileChange(
      doc._id.toString(),
      doc.requestId,
      doc.companyId,
      doc.accountId,

      doc.profileChanges.map((change) => ({
        field: change.field,
        oldValue: change.oldValue,
        newValue: change.newValue,
        reason: change.reason,
        status: change.status,
        reviewRemarks: change.reviewRemarks,
      })),

      doc.status,
      doc.submittedAt,
      doc.reviewedBy,
      doc.reviewedAt,
      doc.reviewRemarks,

      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(
    entity: CompanyProfileChange,
  ): CompanyProfileChangeCreateData {
    return {
      requestId: entity.requestId,
      companyId: entity.companyId,
      accountId: entity.accountId,

      changeType: "PROFILE",

      profileChanges: entity.changes.map((change) => ({
        field: change.field,
        oldValue: change.oldValue,
        newValue: change.newValue,
        reason: change.reason,
        status: change.status,
        reviewRemarks: change.reviewRemarks,
      })),

      status: entity.status,
      submittedAt: entity.submittedAt,
      reviewedBy: entity.reviewedBy,
      reviewedAt: entity.reviewedAt,
      reviewRemarks: entity.reviewRemarks,
    };
  }
}