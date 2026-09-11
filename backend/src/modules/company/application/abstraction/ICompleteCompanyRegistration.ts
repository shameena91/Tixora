export interface ICompleteCompanyRegistration{
    execute(accountId:string,companyrequestId:string):Promise<void>
}