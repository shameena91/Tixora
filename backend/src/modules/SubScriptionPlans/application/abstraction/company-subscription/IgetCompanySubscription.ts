import { GetCompanySubscriptionResponseDto } from "../../dto/GetCompanySubscriptionDto";

export interface IgetCompanySubscription {
  execute(id: string ,
  page: number,
  limit: number,): Promise<GetCompanySubscriptionResponseDto>;
}
