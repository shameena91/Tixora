// import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import {
  SubscriptionCreateData,
  SubscriptionDocument,
  SubscriptionMapper,
} from "../../../application/mappers/SubscriptionMapper";

import {
 
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import {
  ISubscriptionRepository,
} from "../../../domain/repositories/ISubscriptionRepository";

import { SubscriptionModel } from "../models/SubscriptionModel";

export class SubscriptionRepository
  implements ISubscriptionRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
      SubscriptionDocument,
      SubscriptionCreateData
    >,
  ) {}

  // -------------------------
  // Common CRUD
  // -------------------------

  async create(
  subscription: Subscription,
): Promise<Subscription> {
  const subscriptionDocument =
    await this._baseRepository.create(
      SubscriptionMapper.toPersistence(subscription),
    );

  return SubscriptionMapper.toDomain(
    subscriptionDocument,
  );
}

  async findById(
    id: string,
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(document);
  }

  async findOne(
    filter: Partial<Subscription>,
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.findOne(
        filter as Partial<SubscriptionDocument>,
      );

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(document);
  }

  async findAll(
    filter?: Partial<Subscription>,
    sort?: Record<string, 1 | -1>,
  ): Promise<Subscription[]> {
    const documents =
      await this._baseRepository.findAll(
        filter as Partial<SubscriptionDocument>,
        sort,
      );

    return documents.map(
      (document) =>
        SubscriptionMapper.toDomain(document),
    );
  }

  async update(
    filter: Partial<Subscription>,
    data: Partial<Subscription>,
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.update(
        filter as Partial<SubscriptionDocument>,
        data as Partial<SubscriptionDocument>,
      );

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(document);
  }

  // -------------------------
  // Subscription-specific
  // -------------------------

  async findByCompanyId(
    companyId: string,
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.findOne({
        companyId,
      });

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(document);
  }

  async findAllByCompanyId(
    companyId: string,
  ): Promise<Subscription[]> {
    const documents =
      await this._baseRepository.findAll(
      { companyId },
      { createdAt: -1 },
    );

    return documents.map(
      (document) =>
        SubscriptionMapper.toDomain(document),
    );
  }

  async findByRazorpayOrderId(
    razorpayOrderId: string,
  ): Promise<Subscription | null> {
    const document =
      await this._baseRepository.findOne({
        razorpayOrderId,
      });

    if (!document) {
      return null;
    }

    return SubscriptionMapper.toDomain(document);
  }

  async updateSubscription(
    id: string,
    data: {
      status?: SubscriptionStatus;
      startDate?: Date;
      endDate?: Date | null;
      razorpayOrderId?: string | null;
    // planId?: string;
    // billingCycle?: BillingCycle;
    },
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
        },
      )
        .lean<SubscriptionDocument>()
        .exec();

    if (!document) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    return SubscriptionMapper.toDomain(document);
  }

async expireActiveSubscriptions(
  currentDate: Date,
): Promise<number> {
  const result = await SubscriptionModel.updateMany(
    {
      status: SubscriptionStatus.ACTIVE,
      endDate: {
        $ne: null,
        $lte: currentDate,
      },
    },
    {
      $set: {
        status: SubscriptionStatus.EXPIRED,
        updatedAt: currentDate,
      },
    },
  ).exec();

  return result.modifiedCount;
}
// async findDueScheduledSubscriptions(
//   currentDate: Date,
// ): Promise<Subscription[]> {
//   const documents = await SubscriptionModel.find({
//     status: SubscriptionStatus.SCHEDULED,
//     startDate: {
//       $lte: currentDate,
//     },
//   })
//     .sort({ startDate: 1 })
//     .lean<SubscriptionDocument[]>()
//     .exec();

//   return documents.map(
//     (document) => SubscriptionMapper.toDomain(document),
//   );
// }
async findActiveByCompanyId(
  companyId: string,
): Promise<Subscription | null> {
  const document = await SubscriptionModel.findOne({
    companyId,
    status: SubscriptionStatus.ACTIVE,
  })
    .sort({ createdAt: -1 })
    .lean<SubscriptionDocument>()
    .exec();

  if (!document) {
    return null;
  }

  return SubscriptionMapper.toDomain(document);
}

async activateScheduledSubscriptions(
  currentDate: Date,
): Promise<number> {
  const result = await SubscriptionModel.updateMany(
    {
      status: SubscriptionStatus.SCHEDULED,
      startDate: { $lte: currentDate },
    },
    {
      $set: {
        status: SubscriptionStatus.ACTIVE,
        updatedAt: currentDate,
      },
    },
  ).exec();

  return result.modifiedCount;
}
}