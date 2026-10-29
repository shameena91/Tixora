import { GetCompanySubscriptionResponseDto } from "../../dto/GetCompanySubscriptionDto";

export interface IGetMySubscriptionStatus {
  execute(accountId: string , page: number,
    limit: number,): Promise<GetCompanySubscriptionResponseDto | null>;
}
