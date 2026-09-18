
import { MyCompanyRequestStatus } from "../../domain/types/MyCompanyRequest";


export interface IGetMyCompanyRequest{
    execute(accountid:string):Promise<MyCompanyRequestStatus>
}