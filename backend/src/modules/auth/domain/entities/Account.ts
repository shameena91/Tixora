export enum AccountStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
}
export enum AccountRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
}
export enum RegistrationStep {
  ADMIN_DETAILS = "ADMIN_DETAILS",
  COMPANY_DETAILS = "COMPANY_DETAILS",
  COMPANY_LOCATION="COMPANY_LOCATION",
  DOCUMENTS = "DOCUMENTS",
  COMPLETED = "COMPLETED",
}

export class Account {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public  phone: string,
    public designation: string,

    public passwordHash: string | null,
       public role: AccountRole,
    public status: AccountStatus,
    public emailVerified: boolean,
    public registrationStep: RegistrationStep,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  public verifyEmail(): void {
    this.emailVerified = true;
    this.updatedAt = new Date();
  }

  public setPassword(passwordHash: string): void {
    this.passwordHash = passwordHash;
    this.updatedAt = new Date();
  }

    public moveToNextStep(step: RegistrationStep): void {
    this.registrationStep = step;
    this.updatedAt = new Date();
  }
}
