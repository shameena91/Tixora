import { GetCompanySubscriptionResponseDto } from "../../dto/GetCompanySubscriptionDto";

export interface IGetMySubscriptionStatus {
  execute(accountId: string): Promise<GetCompanySubscriptionResponseDto | null>;
}
