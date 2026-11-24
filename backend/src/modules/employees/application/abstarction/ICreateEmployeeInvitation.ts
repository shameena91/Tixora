
export interface ICreateEmployeeInvitation{
execute(accountId:string,invitedAccountById:string):Promise<void>
}