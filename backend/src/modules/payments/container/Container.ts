import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";

import {
  PaymentDocument,
  PaymentDocumentCreateData,
} from "../application/mappers/PaymentMapper";

import { CreatePayment } from "../application/usecases/CreatePayment";
import { GetPaymentHistory } from "../application/usecases/GetPaymentHistory";

import { PaymentModel } from "../infrastructure/database/modals/PaymentModel";

import { PaymentRepository } from "../infrastructure/database/repositories/PaymentRepository";
import { PaymentController } from "../presentation/controller/PaymentController";


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

export const paymentController =
  new PaymentController(
    createPayment,
    getPaymentHistory,
  );