import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import { generatePaymentId } from "../../../../../shared/utills/generatePaymentId";
import { PaymentCreateData, PaymentDocument, PaymentDocumentCreateData, PaymentMapper } from "../../../application/mappers/PaymentMapper";
import { Payment } from "../../../domain/entities/Payment";
import { IPaymentRepository } from "../../../domain/repositories/IPaymentRepository";



export class PaymentRepository
  implements IPaymentRepository
{
  constructor(
    private readonly _baseRepository: BaseRepository<
        PaymentDocument,
    PaymentDocumentCreateData
    >
  ) {}

  // ------------------------------------
  // Create Payment
  // ------------------------------------
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

  // ------------------------------------
  // Find Payment By ID
  // ------------------------------------
  async findById(
    id: string
  ): Promise<Payment | null> {
    const document =
      await this._baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return PaymentMapper.toDomain(document);
  }

  // ------------------------------------
  // Find All Payments By Company ID
  // ------------------------------------
  async findByCompanyId(
    companyId: string
  ): Promise<Payment[]> {
    const documents =
      await this._baseRepository.findAll({
        companyId,
      });

    return documents.map((document) =>
      PaymentMapper.toDomain(document)
    );
  }

  // ------------------------------------
  // Find All Payments By Subscription ID
  // ------------------------------------
  async findBySubscriptionId(
    subscriptionId: string
  ): Promise<Payment[]> {
    const documents =
      await this._baseRepository.findAll({
        subscriptionId,
      });

    return documents.map((document) =>
      PaymentMapper.toDomain(document)
    );
  }
}