import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { S3FileStorage } from "../../company/Infrastructure/storageservices/S3FileStorage";

import { companyRepository } from "../../payments/container/Container";
import { InvoiceCreateData } from "../application/mapper/InvoiceMapper";
import { CreateInvoiceUseCase } from "../application/usecase/CreateInvoiceUseCase";
import { DownloadInvoicePdfUrlUseCase } from "../application/usecase/DownloadInvoicePdfUrlUseCase";
import { GetCompanyInvoicesUseCase } from "../application/usecase/GetCompanyInvoicesUseCase";
import { GetInvoicePdfUrlUseCase } from "../application/usecase/GetInvoicePdfUrlUseCase";
import { GetInvoiceUseCase } from "../application/usecase/GetInvoiceUseCase";

import { InvoiceDocument, InvoiceModel } from "../infrastructure/database/modals/InvoiceModal";
import { InvoiceRepository } from "../infrastructure/database/repository/InvoiceRepository";
import { InvoicePdfGenerator } from "../infrastructure/services/InvoicePdfGenerator";
import { InvoiceController } from "../presentation/controlles/InvoiceController";

const invoiceBaseRepository =
  new BaseRepository<InvoiceDocument, InvoiceCreateData>(
    InvoiceModel,
  );

export const invoiceRepository = new InvoiceRepository(
  invoiceBaseRepository,
);
export const invoicePdfGenerator=new InvoicePdfGenerator()
export const createInvoiceUseCase = new CreateInvoiceUseCase(
  invoiceRepository,
invoicePdfGenerator
);

const getInvoiceUseCase = new GetInvoiceUseCase(
  invoiceRepository,
);

const getCompanyInvoicesUseCase = new GetCompanyInvoicesUseCase(
  invoiceRepository,
  companyRepository
  
);
const fileStorage = new S3FileStorage();
const getInvoiceUrl=new GetInvoicePdfUrlUseCase(
  invoiceRepository,
  companyRepository,
  fileStorage
)

const downloadInvoice=new DownloadInvoicePdfUrlUseCase(
  companyRepository,
    invoiceRepository,
    fileStorage
)
export const invoiceController = new InvoiceController(
  createInvoiceUseCase,
  getInvoiceUseCase,
  getCompanyInvoicesUseCase,
  getInvoiceUrl,
  downloadInvoice
);
