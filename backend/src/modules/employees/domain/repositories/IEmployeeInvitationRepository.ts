import { EmployeeInvitation } from "../entities/EmployeeInvitation";

export interface IEmployeeInvitationRepository {
  createInvitation(
    invitation: EmployeeInvitation,
  ): Promise<EmployeeInvitation>;

  findByAccountId(
    accountId: string,
  ): Promise<EmployeeInvitation | null>;

  findByTokenHash(
    tokenHash: string,
  ): Promise<EmployeeInvitation | null>;

  updateInvitation(
    accountId: string,
    data: Partial<EmployeeInvitation>,
  ): Promise<EmployeeInvitation | null>;
}