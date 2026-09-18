import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { SubscriptionPlanCreateData, SubscriptionPlanDocument, SubscriptionPlanMapper } from "../../../application/mappers/SubscriptionPlanMapper";
import { SubscriptionPlan } from "../../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlan";

import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";

export class SubscriptionPlanRepository
  implements ISubscriptionPlanRepository
{
constructor( private readonly baseRepository:BaseRepository<
    SubscriptionPlanDocument,
    SubscriptionPlanCreateData>)
   {
    this.baseRepository=baseRepository
   }
  async create(data: SubscriptionPlanCreateData): Promise<SubscriptionPlan> {
  //  const persistenceData=SubscriptionPlanMapper.toPersistence(data)
const subscriptionPlanDocument =
      await this.baseRepository.create(data);

    return SubscriptionPlanMapper.toDomain(subscriptionPlanDocument);
  }

  async findById(id: string): Promise<SubscriptionPlan | null> {
    const document = await SubscriptionPlanModel.findById(id);

    if (!document) {
      return null;
    }

    return SubscriptionPlanMapper.toDomain(document);
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    const documents = await SubscriptionPlanModel.find();

    return documents.map((document) =>
      SubscriptionPlanMapper.toDomain(document),
    );
  }
  
//  async update(
//     id: string,
//     data: SubscriptionPlanCreateData
//   ): Promise<SubscriptionPlan | null> {
//     const subscriptionPlanDocument =
//       await this.baseRepository.update(id, data);

//     if (!subscriptionPlanDocument) {
//       return null;
//     }

//     return SubscriptionPlanMapper.toDomain(
//       subscriptionPlanDocument
//     );
//   }

//   async delete(
//     id: string
//   ): Promise<void> {
//     const subscriptionPlanDocument =
//       await this.baseRepository.delete(id);

//     if (!subscriptionPlanDocument) {
//       return null;
//     }

//     return SubscriptionPlanMapper.toDomain(
//       subscriptionPlanDocument
//     );
//   }
}