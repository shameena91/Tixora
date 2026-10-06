import { GetSubscriptionsPaginatedResponseDto } from "../../dto/GetSubscriptionsPaginatedResponseDto";

export interface IGetAllSubscriptions {
  execute(
    page: number,
    limit: number,
  ): Promise<GetSubscriptionsPaginatedResponseDto>;
}