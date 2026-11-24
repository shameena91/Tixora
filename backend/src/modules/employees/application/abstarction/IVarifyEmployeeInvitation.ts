export interface IVarifyEmployeeInvitation{
  

     execute(token:string):Promise<{valid:boolean}>
}