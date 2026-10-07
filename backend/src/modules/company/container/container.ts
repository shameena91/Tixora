import { CompanyRequestRepository } from "../Infrastructure/database/repositories/CompanyRequestRepository";

import { ApproveCompanyRequest } from "../application/usecases/companyRequests/ApproveCompanyRequest";
import { MoreInfoCompanyrequest } from "../application/usecases/companyRequests/MoreInfoCompanyRequest";
import { RejectCompanyRequest } from "../application/usecases/companyRequests/RejectCompanyRequest";
import { ResubmitCompanyRequest } from "../application/usecases/companyRequests/ResubmitCompanyRequest";
import { UpdateCompanyRequest } from "../application/usecases/companyRequests/UpdateCompanyRequest";

import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import {
  AccountCreateData,
  AccountDocument,
} from "../../auth/application/mappers/Accountmapper";
import { AccountModel } from "../../auth/infrastructure/database/models/AccountModel";
import { AccountRepository } from "../../auth/infrastructure/database/repositories/AccountRepository";
import {
  NotificationCreateData,
  NotificationDocument,
} from "../../notification/application/mapper/NotificationMappers";
import { NotificationModel } from "../../notification/infrastructure/models/NotifiationModel";
import { NotificationRepository } from "../../notification/infrastructure/repository/NotificationRepository";
import { GetAllCompanyRequests } from "../application/usecases/companyRequests/GetAllCompanyRequests";
import { GetCompanyRequest } from "../application/usecases/companyRequests/GetCompanyRequest";
import { SubmitCompanyDocuments } from "../application/usecases/companyRequests/SubmitCompanyDocuments";
import { UpdateCompanyDocuments } from "../application/usecases/companyRequests/UpdateCompanyDocuments";
import { UpdateCompanyLocation } from "../application/usecases/companyRequests/UpdateCompanyLocation";
import { CompanyRequestModel } from "../Infrastructure/database/models/CompanyRequestModel";
import { S3FileStorage } from "../Infrastructure/storageservices/S3FileStorage";
import { CompanyRequestController } from "../presentation/controller/CompanyRequestController";

import { createTimeline } from "../../timeline/containers/container";
import { CompanyCreateData } from "../application/mappers/CompanyMapper";
import { GetCompanies } from "../application/usecases/company/GetCompanies";
import { GetCompanyDocumentUrl } from "../application/usecases/companyRequests/GetCompanyDocumentUrl";
import { GetMyCompanyRequestStatus } from "../application/usecases/companyRequests/GetMyCompanyRequestStatus";
import { UpdateCompanyDocumentStatusUseCase } from "../application/usecases/companyRequests/UpdateCompanyDocumentStatus";
import { UpdateCompanyLogo } from "../application/usecases/companyRequests/UpdateCompanyLogo";

import { CompleteCompanyRegistration } from "../application/usecases/companyRequests/CompleteCompanyRegistration";
import { CreateCompanyRequest } from "../application/usecases/companyRequests/CreateCompanyRequest";
import { CreateCompany } from "../application/usecases/company/CreateCompany";
import {
  CompanyDocument,
  CompanyModel,
} from "../Infrastructure/database/models/CompanyModel";
import { CompanyRepository } from "../Infrastructure/database/repositories/CompanyRepository";
import { CompanyController } from "../presentation/controller/CompanyController";
import { GetCompanyDetails } from "../application/usecases/company/GetCompanyDetails";
import {
  subscriptionPlanRepository,
  subscriptionRepository,
} from "../../SubScriptionPlans/container/Container";
import { GetCompanyAdmins } from "../application/usecases/company/GetCompanyAdmins";
import { UpdateCompanyStatus } from "../application/usecases/company/UpdateCompanyStatus";

const baseCompanyRequestRepository = new BaseRepository(CompanyRequestModel);

const companyRequestRepository = new CompanyRequestRepository(
  baseCompanyRequestRepository,
);

const baseAccountRepository = new BaseRepository<
  AccountDocument,
  AccountCreateData
>(AccountModel);

const accountRepository = new AccountRepository(baseAccountRepository);
const fileStorage = new S3FileStorage();

const createCompanyRequest = new CreateCompanyRequest(
  companyRequestRepository,
  accountRepository,
);

const baseCompanyrepository = new BaseRepository<
  CompanyDocument,
  CompanyCreateData
>(CompanyModel);
const comapnyRepository = new CompanyRepository(baseCompanyrepository);
const createCompany = new CreateCompany(comapnyRepository);
const approveCompanyRequest = new ApproveCompanyRequest(
  companyRequestRepository,
  createCompany,
  createTimeline,
  accountRepository,
);

const rejectCompanyRequest = new RejectCompanyRequest(
  companyRequestRepository,
  createTimeline,
);

const requestMoreInfo = new MoreInfoCompanyrequest(
  companyRequestRepository,
  createTimeline,
);

const resubmitCompanyRequest = new ResubmitCompanyRequest(
  companyRequestRepository,
  createTimeline,
);

const updateCompanyRequest = new UpdateCompanyRequest(companyRequestRepository);

const updateCompanyLocation = new UpdateCompanyLocation(
  companyRequestRepository,
  accountRepository,
);

const baseNotificationRepository = new BaseRepository<
  NotificationDocument,
  NotificationCreateData
>(NotificationModel);

const notificationRepository = new NotificationRepository(
  baseNotificationRepository,
);
// const createNotification =
// // new CreateNotification(
// //   notificationRepository
// // );
const completeCompanyRegistration = new CompleteCompanyRegistration(
  accountRepository,

  createTimeline,
);

const getCompanyRequest = new GetCompanyRequest(
  companyRequestRepository,
  accountRepository,
  fileStorage,
);
const updateCompanyLogo = new UpdateCompanyLogo(fileStorage);

const updateCompanyDocuments = new UpdateCompanyDocuments(
  companyRequestRepository,
  fileStorage,
);
const submitCompanyDocuments = new SubmitCompanyDocuments(
  companyRequestRepository,
  accountRepository,
);
const getAllCompanyRequest = new GetAllCompanyRequests(
  companyRequestRepository,
  accountRepository,
);
const getMyCompanyRequest = new GetMyCompanyRequestStatus(
  companyRequestRepository,
);

const getCompanyDocumentUrl = new GetCompanyDocumentUrl(
  companyRequestRepository,
  fileStorage,
);

const updateCompanyDocumentStatus = new UpdateCompanyDocumentStatusUseCase(
  companyRequestRepository,
  createTimeline,
);
const companyreopsitory = new CompanyRepository(baseCompanyrepository);

const getCompanyAdmin = new GetCompanyAdmins(
  companyreopsitory,
  accountRepository,
);
const getCompanies = new GetCompanies(companyreopsitory, fileStorage);
const getCompanyDetails = new GetCompanyDetails(
  companyreopsitory,

  fileStorage,
  subscriptionRepository,
  subscriptionPlanRepository,
  accountRepository,
);
export const updateCompanyStatus = new UpdateCompanyStatus(companyreopsitory);
export const companyRequestController = new CompanyRequestController(
  createCompanyRequest,
  approveCompanyRequest,
  rejectCompanyRequest,
  requestMoreInfo,
  resubmitCompanyRequest,
  updateCompanyRequest,
  updateCompanyLocation,
  updateCompanyDocuments,
  getCompanyRequest,
  getAllCompanyRequest,
  completeCompanyRegistration,
  submitCompanyDocuments,
  getMyCompanyRequest,
  updateCompanyLogo,
  getCompanyDocumentUrl,
  updateCompanyDocumentStatus,
);

export const companyController = new CompanyController(
  getCompanies,
  getCompanyDetails,
  getCompanyAdmin,
  updateCompanyStatus,
);
