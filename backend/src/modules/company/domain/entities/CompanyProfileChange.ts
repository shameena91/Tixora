export enum CompanyProfileChangeStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PARTIALLY_APPROVED = "PARTIALLY_APPROVED",
}

export enum CompanyProfileFieldChangeStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum CompanyProfileField {
  COMPANY_NAME = "companyName",
  REGISTRATION_NUMBER = "registrationNumber",
  COMPANY_TYPE = "companyType",
  EMPLOYEE_RANGE = "employeeRange",
  ADDRESS = "address",
  CITY = "city",
  STATE = "state",
  COUNTRY = "country",
  POSTAL_CODE = "postalCode",
}

export interface ProfileFieldChange {
  field: CompanyProfileField;
  oldValue: string | null;
  newValue: string;
  reason: string;
  status: CompanyProfileFieldChangeStatus;
  reviewRemarks: string | null;
}

export class CompanyProfileChange {
  constructor(
    public readonly id: string | null,
    public readonly requestId: string,
    public readonly companyId: string,
    public readonly accountId: string,

    public readonly changes: ProfileFieldChange[],

    public status: CompanyProfileChangeStatus,

    public readonly submittedAt: Date,

    public reviewedBy: string | null,
    public reviewedAt: Date | null,
    public reviewRemarks: string | null,

    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  private ensurePending(): void {
    if (this.status !== CompanyProfileChangeStatus.PENDING) {
      throw new Error(
        `Cannot review request with status ${this.status}`,
      );
    }
  }

  // Approve the entire profile change request.
  public approve(
    reviewerId: string,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    this.changes.forEach((change) => {
      change.status = CompanyProfileFieldChangeStatus.APPROVED;
      change.reviewRemarks = null;
    });

    this.status = CompanyProfileChangeStatus.APPROVED;
    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.reviewRemarks = null;
    this.updatedAt = reviewedAt;
  }

  // Reject the entire profile change request.
  public reject(
    reviewerId: string,
    remarks: string,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    this.changes.forEach((change) => {
      change.status = CompanyProfileFieldChangeStatus.REJECTED;
      change.reviewRemarks = remarks;
    });

    this.status = CompanyProfileChangeStatus.REJECTED;
    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.reviewRemarks = remarks;
    this.updatedAt = reviewedAt;
  }

  // Review one field at a time.
  public reviewField(
    field: CompanyProfileField,
    decision:
      | CompanyProfileFieldChangeStatus.APPROVED
      | CompanyProfileFieldChangeStatus.REJECTED,
    reviewerId: string,
    remarks: string | null = null,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    const change = this.changes.find(
      (item) => item.field === field,
    );

    if (!change) {
      throw new Error("Profile field change not found");
    }

    if (change.status !== CompanyProfileFieldChangeStatus.PENDING) {
      throw new Error("This field has already been reviewed");
    }

    change.status = decision;
    change.reviewRemarks = remarks;
    this.updatedAt = reviewedAt;

    const hasPendingChanges = this.changes.some(
      (item) =>
        item.status === CompanyProfileFieldChangeStatus.PENDING,
    );

    // Keep the request pending until every field is reviewed.
    if (hasPendingChanges) {
      return;
    }

    const approvedCount = this.changes.filter(
      (item) =>
        item.status === CompanyProfileFieldChangeStatus.APPROVED,
    ).length;

    const rejectedCount = this.changes.filter(
      (item) =>
        item.status === CompanyProfileFieldChangeStatus.REJECTED,
    ).length;

    if (approvedCount === this.changes.length) {
      this.status = CompanyProfileChangeStatus.APPROVED;
    } else if (rejectedCount === this.changes.length) {
      this.status = CompanyProfileChangeStatus.REJECTED;
    } else {
      this.partiallyApprove(reviewerId, reviewedAt);
      return;
    }

    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.updatedAt = reviewedAt;
  }

  // Mark a fully reviewed request as partially approved.
  public partiallyApprove(
    reviewerId: string,
    reviewedAt: Date = new Date(),
  ): void {
    this.ensurePending();

    const hasPendingChanges = this.changes.some(
      (change) =>
        change.status === CompanyProfileFieldChangeStatus.PENDING,
    );

    if (hasPendingChanges) {
      throw new Error(
        "All fields must be reviewed before finalizing the request",
      );
    }

    const approvedCount = this.changes.filter(
      (change) =>
        change.status === CompanyProfileFieldChangeStatus.APPROVED,
    ).length;

    const rejectedCount = this.changes.filter(
      (change) =>
        change.status === CompanyProfileFieldChangeStatus.REJECTED,
    ).length;

    if (approvedCount === 0 || rejectedCount === 0) {
      throw new Error(
        "Partial approval requires both approved and rejected changes",
      );
    }

    this.status = CompanyProfileChangeStatus.PARTIALLY_APPROVED;
    this.reviewedBy = reviewerId;
    this.reviewedAt = reviewedAt;
    this.updatedAt = reviewedAt;
  }
}