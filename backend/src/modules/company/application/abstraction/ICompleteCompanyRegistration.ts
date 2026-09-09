export interface ICompleteCompanyRegistration{
    execute(accountId:string):Promise<void>
}