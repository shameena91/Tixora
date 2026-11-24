export interface IResendEmployeeInvitation{
  execute(accountId: string,invitedByAccountId: string): Promise<void>;
}