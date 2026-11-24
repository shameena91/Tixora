
export class EmployeeInvitation {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
        public readonly invitedByAccountId: string,
        public readonly companyId: string,

    public tokenHash: string,
    public expiresAt: Date,
    public acceptedAt: Date | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public isValid(now: Date = new Date()): boolean {
    return (
      this.acceptedAt === null &&
      this.expiresAt > now
    );
  }

  public markAccepted(): void {
    this.acceptedAt = new Date();
    this.updatedAt = new Date();
  }

  public renew(
    tokenHash: string,
    expiresAt: Date,
  ): void {
    this.tokenHash = tokenHash;
    this.expiresAt = expiresAt;
    this.acceptedAt = null;
    this.updatedAt = new Date();
  }
}
