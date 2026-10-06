// import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
// import { MESSAGES } from "../../../../../shared/constants/messages";
// import { AppErrors } from "../../../../../shared/errors/AppErrors";
// import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
// import {
//   SubscriptionPlanCreateData,
//   SubscriptionPlanDocument,
//   SubscriptionPlanMapper,
// } from "../../../application/mappers/SubscriptionPlanMapper";
// import {
//   SubscriptionPlan,
//   SubscriptionPlanName,
//   SubscriptionPlanStatus,
// } from "../../../domain/entities/SubscriptionPlan";
// import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
// import { CreateSubscriptionPlanDTO } from "../../../presentation/validator/CreateSubscriptionPlanValidator";
// import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";

// export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
//   constructor(
//     private readonly _baseRepository: BaseRepository<
//       SubscriptionPlanDocument,
//       SubscriptionPlanCreateData
//     >,
//   ) {
//     this._baseRepository = _baseRepository;
//   }
//   async create(data: SubscriptionPlanCreateData): Promise<SubscriptionPlan> {
//     //  const persistenceData=SubscriptionPlanMapper.toPersistence(data)
//     const subscriptionPlanDocument = await this._baseRepository.create(data);

//     return SubscriptionPlanMapper.toDomain(subscriptionPlanDocument);
//   }

//   async findById(id: string): Promise<SubscriptionPlan | null> {
//     const document = await this._baseRepository.findById(id);

//     if (!document) {
//       return null;
//     }

//     return SubscriptionPlanMapper.toDomain(document);
//   }

//   async findAllByStatus(
//     status?: SubscriptionPlanStatus,
//   ): Promise<SubscriptionPlan[]> {
//     const filter = status
//       ? {
//           subscriptionPlanStatus: status,
//         }
//       : {};

//     const documents = await this._baseRepository.findAll(filter);

//     return documents.map((document) =>
//       SubscriptionPlanMapper.toDomain(document),
//     );
//   }
//   async findAll(): Promise<SubscriptionPlan[]> {
//     const documents = await this._baseRepository.findAll({}, { createdAt: -1 });

//     return documents.map((document) =>
//       SubscriptionPlanMapper.toDomain(document),
//     );
//   }

//   async findAllPaginated(
//   page: number,
//   limit: number,
// ) {
//   const result =
//     await this._baseRepository.findAllPaginated(
//       {},
//       page,
//       limit,
//       {
//         createdAt: -1,
//       },
//     );

//   return {
//     data: result.data.map((document) =>
//       SubscriptionPlanMapper.toDomain(document),
//     ),
//     total: result.total,
//     page: result.page,
//     limit: result.limit,
//     totalPages: result.totalPages,
//   };
// }
//   async update(
//     id: string,
//     data: CreateSubscriptionPlanDTO,
//   ): Promise<SubscriptionPlan> {
//     const subscriptionPlanDocument =
//       await SubscriptionPlanModel.findByIdAndUpdate(
//         id,

//         { $set: data, updatedAt: new Date() },
//         {
//           new: true,
//         },
//       ).lean<SubscriptionPlanDocument>();

//     if (!subscriptionPlanDocument) {
//       throw new AppErrors(MESSAGES.PLAN_NOT_FOUND, ErrorCode.ACCOUNT_NOT_FOUND);
//     }

//     return SubscriptionPlanMapper.toDomain(subscriptionPlanDocument);
//   }
//   async updateStatus(
//     id: string,
//     status: SubscriptionPlanStatus,
//   ): Promise<void> {
//     const subscriptionPlanDocument =
//       await SubscriptionPlanModel.findByIdAndUpdate(
//         id,
//         {
//           $set: {
//             subscriptionPlanStatus: status,
//           },
//         },
//         {
//           runValidators: true,
//         },
//       ).exec();

//     if (!subscriptionPlanDocument) {
//       throw new AppErrors(
//         MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
//         ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
//       );
//     }
//   }
//   async delete(id: string): Promise<void> {
//     const subscriptionPlanDocument =
//       await SubscriptionPlanModel.findByIdAndDelete(id).exec();

//     if (!subscriptionPlanDocument) {
//       throw new AppErrors(
//         MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
//         ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
//       );
//     }
//   }
//   async findByNameAndStatus(
//     name: SubscriptionPlanName,
//     status:SubscriptionPlanStatus
//   ): Promise<SubscriptionPlan | null> {
//     const document = await this._baseRepository.findOne({
//       name: name,
//       subscriptionPlanStatus:status

//     });

//     if (!document) {
//       return null;
//     }

//     return SubscriptionPlanMapper.toDomain(document);
//   }
// }


import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import {
  SubscriptionPlanCreateData,
  SubscriptionPlanDocument,
  SubscriptionPlanMapper,
} from "../../../application/mappers/SubscriptionPlanMapper";

import {
  SubscriptionPlan,
  SubscriptionPlanName,
  SubscriptionPlanStatus,
} from "../../../domain/entities/SubscriptionPlan";

import {
  ISubscriptionPlanRepository,
} from "../../../domain/repositories/ISubscriptionPlanRepository";

import {
  CreateSubscriptionPlanDTO,
} from "../../../presentation/validator/CreateSubscriptionPlanValidator";

import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";

export class SubscriptionPlanRepository
  implements ISubscriptionPlanRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
      SubscriptionPlanDocument,
      SubscriptionPlanCreateData
    >,
  ) {}

 

  async create(
    data: SubscriptionPlanCreateData,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlanDocument =
      await this._baseRepository.create(data);

    return SubscriptionPlanMapper.toDomain(
      subscriptionPlanDocument,
    );
  }

  async findById(
    id: string,
  ): Promise<SubscriptionPlan | null> {
    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return SubscriptionPlanMapper.toDomain(
      document,
    );
  }

  async findOne(
    filter: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan | null> {
    const document =
      await this._baseRepository.findOne(
        filter as Partial<SubscriptionPlanDocument>,
      );

    if (!document) {
      return null;
    }

    return SubscriptionPlanMapper.toDomain(
      document,
    );
  }

  async findAll(
    filter?: Partial<SubscriptionPlan>,
    sort?: Record<string, 1 | -1>,
  ): Promise<SubscriptionPlan[]> {
    const documents =
      await this._baseRepository.findAll(
        filter as Partial<SubscriptionPlanDocument>,
        sort,
      );

    return documents.map(
      (document) =>
        SubscriptionPlanMapper.toDomain(
          document,
        ),
    );
  }

  async update(
    filter: Partial<SubscriptionPlan>,
    data: Partial<SubscriptionPlan>,
  ): Promise<SubscriptionPlan | null> {
    const document =
      await this._baseRepository.update(
        filter as Partial<SubscriptionPlanDocument>,
        data as Partial<SubscriptionPlanDocument>,
      );

    if (!document) {
      return null;
    }

    return SubscriptionPlanMapper.toDomain(
      document,
    );
  }

  // -------------------------
  // SubscriptionPlan-specific
  // -------------------------

  async findAllByStatus(
    status?: SubscriptionPlanStatus,
  ): Promise<SubscriptionPlan[]> {
    const filter = status
      ? {
          subscriptionPlanStatus: status,
        }
      : {};

    const documents =
      await this._baseRepository.findAll(
        filter,
      );

    return documents.map(
      (document) =>
        SubscriptionPlanMapper.toDomain(
          document,
        ),
    );
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<{
    data: SubscriptionPlan[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip =
      (page - 1) * limit;

    const [
      documents,
      total,
    ] = await Promise.all([
      SubscriptionPlanModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<SubscriptionPlanDocument[]>()
        .exec(),

      SubscriptionPlanModel.countDocuments({})
        .exec(),
    ]);

    return {
      data: documents.map(
        (document) =>
          SubscriptionPlanMapper.toDomain(
            document,
          ),
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }

  async updatePlan(
    id: string,
    data: CreateSubscriptionPlanDTO,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlanDocument =
      await SubscriptionPlanModel.findByIdAndUpdate(
        id,
        {
          $set: data,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
        .lean<SubscriptionPlanDocument>()
        .exec();

    if (!subscriptionPlanDocument) {
      throw new AppErrors(
        MESSAGES.PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    return SubscriptionPlanMapper.toDomain(
      subscriptionPlanDocument,
    );
  }

  async updateStatus(
    id: string,
    status: SubscriptionPlanStatus,
  ): Promise<void> {
    const subscriptionPlanDocument =
      await SubscriptionPlanModel.findByIdAndUpdate(
        id,
        {
          $set: {
            subscriptionPlanStatus: status,
            updatedAt: new Date(),
          },
        },
        {
          runValidators: true,
        },
      ).exec();

    if (!subscriptionPlanDocument) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }
  }

  async delete(
    id: string,
  ): Promise<void> {
    const subscriptionPlanDocument =
      await SubscriptionPlanModel.findByIdAndDelete(
        id,
      ).exec();

    if (!subscriptionPlanDocument) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }
  }

  async findByNameAndStatus(
    name: SubscriptionPlanName,
    status: SubscriptionPlanStatus,
  ): Promise<SubscriptionPlan | null> {
    const document =
      await this._baseRepository.findOne({
        name,
        subscriptionPlanStatus: status,
      });

    if (!document) {
      return null;
    }

    return SubscriptionPlanMapper.toDomain(
      document,
    );
  }
}