import { Types } from "mongoose";
import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
import {
  InvoiceCreateData,
  InvoiceMapper,
  InvoiceMapperData,
} from "../../../application/mapper/InvoiceMapper";

import { Invoice } from "../../../domain/entities/Invoice";
import { IInvoiceRepository } from "../../../domain/repositories/IInvoiceRepository";
import { InvoiceDocument } from "../modals/InvoiceModal";

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

  async findByCompanyId(companyId: string): Promise<Invoice[]> {
    const documents = await this._baseRepository.findAll(
      { companyId } as Partial<InvoiceDocument>,
      { createdAt: -1 },
    );

    return documents.map((document) =>
      InvoiceMapper.toEntity({
        ...document,
        _id: String(document._id),
      } as InvoiceMapperData),
    );
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