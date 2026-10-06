import type { GetPaymentHistoryDto } from "../dto/GetPaymentHistoryDto";

export interface IGetPaymentHistory {
  execute(
    companyId: string,
  ): Promise<GetPaymentHistoryDto[]>;
}