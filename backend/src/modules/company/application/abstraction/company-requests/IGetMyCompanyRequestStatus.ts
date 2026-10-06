
import { MyCompanyRequestStatus } from "../../../domain/types/MyCompanyRequest";


export interface IGetMyCompanyRequestStatus
{
    execute(accountid:string):Promise<MyCompanyRequestStatus>
}