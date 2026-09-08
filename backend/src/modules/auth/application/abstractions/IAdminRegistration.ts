import { AdminRegistrationRequestDto } from "../validators/AdminRegistrationValidator";

export interface IAdminRegistration{
    execute(dtp:AdminRegistrationRequestDto):Promise<{
        accountId:string
    }>
}