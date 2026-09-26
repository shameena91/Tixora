import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { SubscriptionCreateData, SubscriptionDocument, SubscriptionMapper } from "../../../application/mappers/SubscriptionMapper";
import { Subscription } from "../../../domain/entities/Subscription";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { SubscriptionModel } from "../models/SubscriptionModel";


export class SubscriptionRepository
  implements ISubscriptionRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
      SubscriptionDocument,
      SubscriptionCreateData
    >
  ) {}

  // ------------------------------------
  // Create Subscription
  // ------------------------------------
  async create(
    data: SubscriptionCreateData
  ): Promise<Subscription> {
    const subscriptionDocument =
      await this._baseRepository.create(data);

    return SubscriptionMapper.toDomain(
      subscriptionDocument
    );
  }

  // ------------------------------------
  // Find Subscription By ID
  // ------------------------------------
  async findById(
    id: string
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(
      document
    );
  }

  // ------------------------------------
  // Find All Subscriptions
  // ------------------------------------
  async findAll(): Promise<Subscription[]> {
    const documents =
      await this._baseRepository.findAll();

    return documents.map((document) =>
      SubscriptionMapper.toDomain(document)
    );
  }

  // ------------------------------------
  // Find Subscription By Company ID
  // ------------------------------------
  async findByCompanyId(
    companyId: string
  ): Promise<Subscription | null> {
    const document =
      await SubscriptionModel.findOne({
        companyId,
      })
        .lean<SubscriptionDocument>()
        .exec();

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(
      document
    );
  }
}