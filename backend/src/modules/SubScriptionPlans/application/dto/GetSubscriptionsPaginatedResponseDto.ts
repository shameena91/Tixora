import { SubScriptionListItems } from "./SubScriptionListItems";

export interface GetSubscriptionsPaginatedResponseDto {
  data: SubScriptionListItems[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
