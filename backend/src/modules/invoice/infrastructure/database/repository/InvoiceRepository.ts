import { Types } from "mongoose";
import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import {
  InvoiceCreateData,
  InvoiceMapper,
  InvoiceMapperData,
} from "../../../application/mapper/InvoiceMapper";

import { Invoice } from "../../../domain/entities/Invoice";
import { IInvoiceRepository } from "../../../domain/repositories/IInvoiceRepository";
import { InvoiceDocument, InvoiceModel } from "../modals/InvoiceModal";

export class InvoiceRepository implements IInvoiceRepository {
  constructor(
    private readonly _baseRepository: BaseRepository<
      InvoiceDocument,
      InvoiceCreateData
    >,
  ) {}

  async createInvoice(data: InvoiceCreateData): Promise<Invoice> {
    const document = await this._baseRepository.create(
      InvoiceMapper.toPersistence(data),
    );

    return InvoiceMapper.toEntity({
      ...document,
      _id: String(document._id),
    } as InvoiceMapperData);
  }

  async find(id: string): Promise<Invoice | null> {
    const document = await this._baseRepository.findById(id);

    if (!document) return null;

    return InvoiceMapper.toEntity({
      ...document,
      _id: String(document._id),
    } as InvoiceMapperData);
  }


async findByCompanyId(
  companyId: string,
  page: number,
  limit: number,
): Promise<Invoice[]> {
  const documents = await InvoiceModel.find({ companyId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  return documents.map((document) =>
    InvoiceMapper.toEntity({
      ...document.toObject(),
      _id: String(document._id),
    } as InvoiceMapperData),
  );
}
async countByCompanyId(companyId: string): Promise<number> {
  return InvoiceModel.countDocuments({ companyId }).exec();
}

async findByPaymentId(
  paymentId: string,
): Promise<Invoice | null> {
  const document = await this._baseRepository.findOne({
    paymentId,
  });

  if (!document) {
    return null;
  }

  return InvoiceMapper.toEntity({
    ...document,
    _id: String(document._id),
  } as InvoiceMapperData);
}
async updatePdfKey(
  invoiceId: string,
  pdfKey: string,
): Promise<void> {
  const updatedInvoice = await this._baseRepository.update(
    {
      _id: new Types.ObjectId(invoiceId),
    } as Partial<InvoiceDocument>,
    {
      pdfKey,
    },
  );

  if (!updatedInvoice) {
    throw new Error("Invoice not found while updating PDF key");
  }
}
}