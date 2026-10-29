import { CompanyDocumentType } from "../value-objects/CompanyDocuments";

export enum CompanyDocumentChangeStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export class CompanyDocumentChange {
  constructor(
    public readonly id: string|null,
    public readonly requestId: string,
    public readonly companyId: string,
    public readonly accountId: string,

    public readonly documentType: CompanyDocumentType,
    public readonly oldDocumentKey: string | null,
    public readonly newDocumentKey: string,


    public reason: string | null,
    public status: CompanyDocumentChangeStatus,

    public readonly submittedAt: Date,

    public reviewedBy: string | null,
    public reviewedAt: Date | null,
    public reviewRemarks: string | null,

    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  private ensurePending(): void {
    if (this.status !== CompanyDocumentChangeStatus.PENDING) {
      throw new Error(
        `Cannot review request with status ${this.status}`,
      );
    }
  }

  public approve(
    reviewerId: string,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    this.status = CompanyDocumentChangeStatus.APPROVED;
    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.updatedAt = reviewedAt;
  }

  public reject(
    reviewerId: string,
    remarks: string,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    this.status = CompanyDocumentChangeStatus.REJECTED;
    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.reviewRemarks = remarks;
    this.updatedAt = reviewedAt;
  }
}