import { IBaseRepository } from "../../../../shared/repository/IBaseRepository";
import { SubscriptionCreateData } from "../../application/mappers/SubscriptionMapper";
import { Subscription } from "../entities/Subscription";

export interface ISubscriptionRepository
  extends IBaseRepository< Subscription,
  SubscriptionCreateData> {

  findByCompanyId(
    companyId: string
  ): Promise<Subscription | null>;
}