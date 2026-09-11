import { CompanyDocument } from "../value-objects/CompanyDocuments";
import { CompanyLocation } from "../value-objects/CompanyLocation";
export enum CompanyRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  MORE_INFO_REQUIRED = "MORE_INFO_REQUIRED",
}
export enum EmployeeCountRange {
  ONE_TO_FIFTY = "1-50",
  FIFTY_ONE_TO_TWO_HUNDRED = "51-200",
  TWO_HUNDRED_ONE_TO_FIVE_HUNDRED = "201-500",
  FIVE_HUNDRED_PLUS = "500+",
}
export enum CompanyType {
  PRIVATE_LIMITED = "PRIVATE_LIMITED",
  PUBLIC_LIMITED = "PUBLIC_LIMITED",
  LLP = "LLP",
  PARTNERSHIP = "PARTNERSHIP",
  OTHER = "OTHER",
}
export enum RegistrationType {
  REGISTRATION = "REGISTRATION",
  UPDATE = "UPDATE",
}

export class CompanyRequest {
constructor(
public readonly id: string,
public readonly accountId: string,
public companyName: string,
public registrationNumber: string,
public companyEmail: string,
public phone: string,
public yearEstablished: number | null,

public companyType: CompanyType,
public numberOfEmployees: EmployeeCountRange,
public status: CompanyRequestStatus,
public website: string | null,
public logo: string | null,
public description: string | null,

public location: CompanyLocation | null,
public readonly documents:CompanyDocument[],
public readonly createdAt: Date,
public updatedAt: Date
  ) {}

private ensurePending(): void {
  if (
    this.status !== CompanyRequestStatus.PENDING &&
    this.status !== CompanyRequestStatus.MORE_INFO_REQUIRED
  ) {
    throw new Error(
      `Cannot modify request with status ${this.status}`
    );
  }
}

public approve(): void {
  this.ensurePending();

  this.status = CompanyRequestStatus.APPROVED;
  this.updatedAt = new Date();
}

public reject(): void {
  this.ensurePending();

  this.status = CompanyRequestStatus.REJECTED;
  this.updatedAt = new Date();
}

public requestMoreInfo(): void {
  if (this.status !== CompanyRequestStatus.PENDING) {
    throw new Error(
      `Cannot request more information for ${this.status} request`
    );
  }

  this.status = CompanyRequestStatus.MORE_INFO_REQUIRED;
  this.updatedAt = new Date();
}
public resubmit(): void {
  if (this.status !== CompanyRequestStatus.MORE_INFO_REQUIRED) {
    throw new Error(
      `Cannot resubmit request with status ${this.status}`
    );
  }

  this.status = CompanyRequestStatus.PENDING;
  this.updatedAt = new Date();
}
}