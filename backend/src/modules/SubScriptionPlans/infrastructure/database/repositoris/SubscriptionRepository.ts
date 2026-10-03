import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { SubscriptionCreateData, SubscriptionDocument, SubscriptionMapper } from "../../../application/mappers/SubscriptionMapper";
import { Subscription, SubscriptionStatus } from "../../../domain/entities/Subscription";
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
    await this._baseRepository.findOne({
      companyId,
    });

  if (!document) {
    return null;
  }

  return SubscriptionMapper.toDomain(
    document
  );
}



// ------------------------------------
// Find All Subscriptions By Company ID
// ------------------------------------
async findAllByCompanyId(
  companyId: string,
): Promise<Subscription[]> {
  const documents =
    await this._baseRepository.findAll({
      companyId,
    });

  return documents.map((document) =>
    SubscriptionMapper.toDomain(document),
  );
}
async findByRazorpayOrderId(
  razorpayOrderId: string
): Promise<Subscription | null> {
  const document =
    await this._baseRepository.findOne({
      razorpayOrderId,
    });

  if (!document) {
    return null;
  }

  return SubscriptionMapper.toDomain(
    document
  );
}
async update(
  id: string,
  data: {
   status?: SubscriptionStatus;
    startDate?: Date;
    endDate?: Date | null;
  }
): Promise<Subscription> {
  const document =
    await SubscriptionModel.findByIdAndUpdate(
      id,
      {
        $set: {
             ...data,
          updatedAt: new Date(),
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .lean<SubscriptionDocument>()
      .exec();

  if (!document) {
    throw new AppErrors(
      MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
      ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND
    );
  }

  return SubscriptionMapper.toDomain(document);
}
}