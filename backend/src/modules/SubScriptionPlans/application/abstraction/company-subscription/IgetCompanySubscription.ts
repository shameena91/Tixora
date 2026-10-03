import { GetCompanySubscriptionResponseDto } from "../../dto/GetCompanySubscriptionDto";

export interface IgetCompanySubscription{
    execute(id:string):Promise<GetCompanySubscriptionResponseDto>
}