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
import { GetMyCompanyDetails } from "../application/usecases/company/GetMyCompanyDetails";
import { GetMyCompanyDocuments } from "../application/usecases/companyRequests/GetMyCompanyDocuments";
import { CompanyProfileChangeCreateData } from "../application/mappers/CompanyProfileChangeMapper";
import { CompanyDocumentChangeCreateData } from "../application/mappers/CompanyDocumentChnageMapper";
import { CompanyChangeRequestModel } from "../Infrastructure/database/models/CompanyChangeRequestModel";
import { CompanyChangeRequestDocument } from "../Infrastructure/database/Schemas/CompanyChangeRequestSchema";
import { CompanyChangeRequestRepository } from "../Infrastructure/database/repositories/CompanyChangeRequestRepository";
import { CreateCompanyProfileChangeRequest } from "../application/usecases/companyUpdaterequests/CreateCompanyProfileChangeRequest";
import { CompanyChangeRequestController } from "../presentation/controller/CompanyChangeRequestController";
import { CreateCompanyDocumentChangeRequest } from "../application/usecases/companyUpdaterequests/CreateCompanyDocumentChangeRequest";
import { GetCompanyChangeRequests } from "../application/usecases/companyUpdaterequests/GetCompanyChangeRequests";
import { GetCompanyChangeRequestById } from "../application/usecases/companyUpdaterequests/GetCompanyChangeRequestById";
import { ReviewCompanyDocumentChangeRequest } from "../application/usecases/companyUpdaterequests/ReviewCompanyDocumentChangeRequest";
import { ReviewCompanyProfileChangeRequest } from "../application/usecases/companyUpdaterequests/ReviewCompanyProfileChangeRequest";
import { companyRepository } from "../../payments/container/Container";
import { SendCompanyEmailChangeOtp } from "../application/usecases/companyUpdaterequests/SendCompanyEmailChangeOtp";
import { otpService, otpStore } from "../../auth/container/container";
import { VerifyCompanyEmailChangeOtp } from "../application/usecases/companyUpdaterequests/VerifyCompanyEmailChangeOtp";

const baseCompanyRequestRepository = new BaseRepository(CompanyRequestModel);

export const companyRequestRepository = new CompanyRequestRepository(
  baseCompanyRequestRepository,
);

const baseAccountRepository = new BaseRepository<
  AccountDocument,
  AccountCreateData
>(AccountModel);

const accountRepository = new AccountRepository(baseAccountRepository);
export const fileStorage = new S3FileStorage();

export const createCompanyRequest = new CreateCompanyRequest(
  companyRequestRepository,
  accountRepository,
);

const baseCompanyrepository = new BaseRepository<
  CompanyDocument,
  CompanyCreateData
>(CompanyModel);
export const comapnyRepository = new CompanyRepository(baseCompanyrepository);

const createCompany = new CreateCompany(comapnyRepository);
export const approveCompanyRequest = new ApproveCompanyRequest(
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
type CompanyChangeRequestCreateData =
  | CompanyProfileChangeCreateData
  | CompanyDocumentChangeCreateData;

const baseCompanyChangeRequestRepository = new BaseRepository<
  CompanyChangeRequestDocument,
  CompanyChangeRequestCreateData
>(CompanyChangeRequestModel);

export const companyChangeRequestRepository =
  new CompanyChangeRequestRepository(
    baseCompanyChangeRequestRepository,
  );
// const baseNotificationRepository = new BaseRepository<
//   NotificationDocument,
//   NotificationCreateData
// >(NotificationModel);

// const notificationRepository = new NotificationRepository(
//   baseNotificationRepository,
// );
// const createNotification =
// // new CreateNotification(
// //   notificationRepository
// // );
const completeCompanyRegistration = new CompleteCompanyRegistration(
  accountRepository,

  createTimeline,
);

export const getCompanyRequest = new GetCompanyRequest(
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


const getCompanyAdmin = new GetCompanyAdmins(
  comapnyRepository,
  accountRepository,
);
const getCompanies = new GetCompanies(comapnyRepository, fileStorage);
const getCompanyDetails = new GetCompanyDetails(
  comapnyRepository,

  fileStorage,
  subscriptionRepository,
  subscriptionPlanRepository,
  accountRepository,
);
const getMyCompanyDocuments =
  new GetMyCompanyDocuments(
    companyRequestRepository,
  );

  export const createCompanyProfileChangeRequest =
  new CreateCompanyProfileChangeRequest(
    comapnyRepository,
    companyChangeRequestRepository,
  );
export const getMyCompanyDetails=new GetMyCompanyDetails(
  comapnyRepository,
  getCompanyDetails
)

const getCompanyChangeRequestById =
  new GetCompanyChangeRequestById(
    companyChangeRequestRepository,
    comapnyRepository,
    accountRepository,
    fileStorage,
  );
const getCompanyChangeRequests =
  new GetCompanyChangeRequests(
    companyChangeRequestRepository,
    
    companyRepository,
      accountRepository,
  
  );

const sendCompanyEmailChangeOtp =
  new SendCompanyEmailChangeOtp(otpService);

const reviewCompanyProfileChangeRequest =
  new ReviewCompanyProfileChangeRequest(
    comapnyRepository,
    companyChangeRequestRepository,
  );

const reviewCompanyDocumentChangeRequest =
  new ReviewCompanyDocumentChangeRequest(
    companyChangeRequestRepository,
  );
const verifyCompanyEmailChangeOtp =
  new VerifyCompanyEmailChangeOtp(
    otpStore,
    companyRepository,
  );

export const updateCompanyStatus = new UpdateCompanyStatus(comapnyRepository);
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
  getMyCompanyDetails,
  getMyCompanyDocuments
);


  export const createCompanyDocumentChangeRequest =
  new CreateCompanyDocumentChangeRequest(
    comapnyRepository,
    companyRequestRepository,
    companyChangeRequestRepository,
    fileStorage,
  );

export const companyChangeRequestController =
  new CompanyChangeRequestController(
    createCompanyProfileChangeRequest,
    createCompanyDocumentChangeRequest,
    getCompanyChangeRequests,
    getCompanyChangeRequestById,
     reviewCompanyProfileChangeRequest,
    reviewCompanyDocumentChangeRequest,
    sendCompanyEmailChangeOtp,
    verifyCompanyEmailChangeOtp
  );



