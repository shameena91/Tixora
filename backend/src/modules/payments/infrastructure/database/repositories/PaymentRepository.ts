// import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
// import { generatePaymentId } from "../../../../../shared/utills/generatePaymentId";
// import { PaymentCreateData, PaymentDocument, PaymentDocumentCreateData, PaymentMapper } from "../../../application/mappers/PaymentMapper";
// import { Payment } from "../../../domain/entities/Payment";
// import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";
// import { PaymentStatus } from "../../../domain/types/PaymentStatus";



// export class PaymentRepository
//   implements IPaymentRepository
// {
//   constructor(
//     private readonly _baseRepository: BaseRepository<
//       PaymentDocument,
//       PaymentDocumentCreateData
//     >
//   ) {}

//   async create(
//     data: PaymentCreateData,
//   ): Promise<Payment> {
//     const paymentId =
//       await generatePaymentId();

//     const paymentDocument =
//       await this._baseRepository.create({
//         ...data,
//         paymentId,
//       });

//     return PaymentMapper.toDomain(
//       paymentDocument,
//     );
//   }

//   async findById(
//     id: string,
//   ): Promise<Payment | null> {
//     const document =
//       await this._baseRepository.findById(id);

//     if (!document) {
//       return null;
//     }

//     return PaymentMapper.toDomain(document);
//   }

//   async findByCompanyId(
//     companyId: string,
//   ): Promise<Payment[]> {
//     const documents =
//       await this._baseRepository.findAll({
//         companyId,
//       });

//     return documents.map((document) =>
//       PaymentMapper.toDomain(document),
//     );
//   }

//   async findBySubscriptionId(
//     subscriptionId: string,
//   ): Promise<Payment[]> {
//     const documents =
//       await this._baseRepository.findAll({
//         subscriptionId,
//       });

//     return documents.map((document) =>
//       PaymentMapper.toDomain(document),
//     );
//   }

//   async findByRazorpayOrderId(
//     razorpayOrderId: string,
//   ): Promise<Payment | null> {
//     const documents =
//       await this._baseRepository.findAll({
//         razorpayOrderId,
//       });

//     const document = documents[0];

//     if (!document) {
//       return null;
//     }

//     return PaymentMapper.toDomain(document);
//   }

//   async updatePaymentStatus(
//   id: string,
//   status: PaymentStatus,
//   subscriptionId: string,
//   razorpayPaymentId: string,
//   paymentDate: Date,
// ): Promise<Payment> {
//   const document =
//     await this._baseRepository.update(
//       { _id: id },
//       {
//         status,
//         subscriptionId,
//         razorpayPaymentId,
//         paymentDate,
//       },
//     );

//   if (!document) {
//     throw new Error("Payment not found");
//   }

//   return PaymentMapper.toDomain(document);
// }
// }



import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { generatePaymentId } from "../../../../../shared/utills/generatePaymentId";

import {
  PaymentCreateData,
  PaymentDocument,
  PaymentDocumentCreateData,
  PaymentMapper,
} from "../../../application/mappers/PaymentMapper";

import { Payment } from "../../../domain/entities/Payment";

import {
  IPaymentRepository,
} from "../../../domain/repositories/IPaymentRepository";

import { PaymentStatus } from "../../../domain/types/PaymentStatus";
import { PaymentModel } from "../modals/PaymentModel";



export class PaymentRepository
  implements IPaymentRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
      PaymentDocument,
      PaymentDocumentCreateData
    >,
  ) {}

  // -------------------------
  // Common CRUD
  // -------------------------

  async create(
    data: PaymentCreateData,
  ): Promise<Payment> {
    const paymentId =
      await generatePaymentId();

    const paymentDocument =
      await this._baseRepository.create({
        ...data,
        paymentId,
      });

    return PaymentMapper.toDomain(
      paymentDocument,
    );
  }

  async findById(
    id: string,
  ): Promise<Payment | null> {
    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return PaymentMapper.toDomain(document);
  }

  async findOne(
    filter: Partial<Payment>,
  ): Promise<Payment | null> {
    const document =
      await this._baseRepository.findOne(
        filter as Partial<PaymentDocument>,
      );

    if (!document) {
      return null;
    }

    return PaymentMapper.toDomain(document);
  }

  async findAll(
    filter?: Partial<Payment>,
    sort?: Record<string, 1 | -1>,
  ): Promise<Payment[]> {
    const documents =
      await this._baseRepository.findAll(
        filter as Partial<PaymentDocument>,
        sort,
      );

    return documents.map(
      (document) =>
        PaymentMapper.toDomain(document),
    );
  }

  async update(
    filter: Partial<Payment>,
    data: Partial<Payment>,
  ): Promise<Payment | null> {
    const document =
      await this._baseRepository.update(
        filter as Partial<PaymentDocument>,
        data as Partial<PaymentDocument>,
      );

    if (!document) {
      return null;
    }

    return PaymentMapper.toDomain(document);
  }

  // -------------------------
  // Payment-specific methods
  // -------------------------

  async findByCompanyId(
    companyId: string,
  ): Promise<Payment[]> {
    const documents =
      await this._baseRepository.findAll({
        companyId,
      });

    return documents.map(
      (document) =>
        PaymentMapper.toDomain(document),
    );
  }

  async findBySubscriptionId(
    subscriptionId: string,
  ): Promise<Payment[]> {
    const documents =
      await this._baseRepository.findAll({
        subscriptionId,
      });

    return documents.map(
      (document) =>
        PaymentMapper.toDomain(document),
    );
  }

  async findByRazorpayOrderId(
    razorpayOrderId: string,
  ): Promise<Payment | null> {
    const document =
      await this._baseRepository.findOne({
        razorpayOrderId,
      });

    if (!document) {
      return null;
    }

    return PaymentMapper.toDomain(document);
  }

  async updatePaymentStatus(
    id: string,
    status: PaymentStatus,
    subscriptionId: string,
    razorpayPaymentId: string,
    paymentDate: Date,
  ): Promise<Payment> {
    const document =
      await PaymentModel.findByIdAndUpdate(
        id,
        {
          status,
          subscriptionId,
          razorpayPaymentId,
          paymentDate,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
        .lean<PaymentDocument>()
        .exec();

    if (!document) {
      throw new Error("Payment not found");
    }

    return PaymentMapper.toDomain(document);
  }
}