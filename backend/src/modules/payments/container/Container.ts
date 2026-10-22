import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { CompanyCreateData } from "../../company/application/mappers/CompanyMapper";
import { CompanyDocument, CompanyModel } from "../../company/Infrastructure/database/models/CompanyModel";
import { CompanyRepository } from "../../company/Infrastructure/database/repositories/CompanyRepository";


import {
  PaymentDocument,
  PaymentDocumentCreateData,
} from "../application/mappers/PaymentMapper";
import { CancelPayment } from "../application/usecases/CancelPayment";

import { CreatePayment } from "../application/usecases/CreatePayment";
import { GetPaymentHistory } from "../application/usecases/GetPaymentHistory";


import { PaymentModel } from "../infrastructure/database/modals/PaymentModel";

import { PaymentRepository } from "../infrastructure/database/repositories/PaymentRepository";
import { PaymentController } from "../presentation/controller/PaymentController";

const baseCompanyRepository = new BaseRepository<
  CompanyDocument,
  CompanyCreateData
>(CompanyModel);

export const companyRepository = new CompanyRepository(
  baseCompanyRepository,
);
const basePaymentRepository =
  new BaseRepository<
    PaymentDocument,
    PaymentDocumentCreateData
  >(PaymentModel);

export const paymentRepository =
  new PaymentRepository(
    basePaymentRepository,
  );

export const getPaymentHistory =
  new GetPaymentHistory(
    paymentRepository,
  );

export const createPayment =
  new CreatePayment(
    paymentRepository,
  );
const cancelPayment=new CancelPayment(
  companyRepository,
  paymentRepository
)
export const paymentController =
  new PaymentController(
    createPayment,
    getPaymentHistory,
    cancelPayment
  );