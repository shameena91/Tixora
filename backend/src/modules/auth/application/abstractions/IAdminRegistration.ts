import { AdminRegistrationRequestDto } from "../dto/AdminregistrationRequestDto"

export interface IAdminRegistration{
    execute(dtp:AdminRegistrationRequestDto):Promise<{
        accountId:string
    }>
}