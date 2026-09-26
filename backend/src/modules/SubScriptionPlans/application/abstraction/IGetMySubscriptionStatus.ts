import { Subscription } from "../../domain/entities/Subscription";


export interface IGetMySubscriptionStatus {
  execute(
    accountId: string
  ): Promise<Subscription | null>;
}