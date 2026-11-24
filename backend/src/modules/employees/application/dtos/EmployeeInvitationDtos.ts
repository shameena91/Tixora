
export interface CreateEmployeeInvitationDTO {
  accountId: string;          
  invitedByAccountId: string;
  companyId:string 
  tokenHash: string;
  expiresAt: Date;
}

export interface EmployeeInvitationResponseDTO {
  id: string;
  accountId: string;
  companyId:string
  expiresAt: Date;
  acceptedAt: Date | null;
  createdAt: Date;
}
