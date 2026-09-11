import { CompanyRequestRepository } from "../Infrastructure/database/repositories/CompanyRequestRepository";

import { ApproveCompanyRequest } from "../application/usecases/ApproveCompanyRequest";
import { CreateCompanyRequest } from "../application/usecases/CreateCompanyRequest";
import { MoreInfoCompanyrequest } from "../application/usecases/MoreInfoCompanyRequest";
import { RejectCompanyRequest } from "../application/usecases/RejectCompanyRequest";
import { ResubmitCompanyRequest } from "../application/usecases/ResubmitCompanyRequest";
import { UpdateCompanyRequest } from "../application/usecases/UpdateCompanyRequest";

import { AccountRepository } from "../../auth/infrastructure/database/repositories/AccountRepository";
import { CompleteCompanyRegistration } from "../application/usecases/CompleteCompanyRegistration";
import { GetCompanyRequest } from "../application/usecases/GetCompanyRequest";
import { UpdateCompanyDocuments } from "../application/usecases/UpdateCompanyDocuments";
import { UpdateCompanyLocation } from "../application/usecases/UpdateCompanyLocation";
import { CompanyRequestController } from "../presentation/controller/CompanyRequestController";
import { S3FileStorage } from "../Infrastructure/storageservices/S3FileStorage";
import { SubmitCompanyDocuments } from "../application/usecases/SubmitCompanyDocuments";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { CompanyRequestModel } from "../Infrastructure/database/models/CompanyRequestModel";
import { AccountModel } from "../../auth/infrastructure/database/models/AccountModel";
import { AccountCreateData, AccountDocument } from "../../auth/application/mappers/Accountmapper"
import { CreateNotification } from "../../notification/application/usecases/CreateNotification";
import { NotificationRepository } from "../../notification/infrastructure/repository/NotificationRepository";
import { NotificationCreateData, NotificationDocument } from "../../notification/application/mapper/NotificationMappers";
import { NotificationModel } from "../../notification/infrastructure/models/NotifiationModel";
import { GetAllCompanyRequests } from "../application/usecases/GetAllCompanyRequests";

const baseCompanyRequestRepository =
  new BaseRepository(
    CompanyRequestModel
  );
const companyRequestRepository =
  new CompanyRequestRepository(baseCompanyRequestRepository);


const baseAccountRepository =
  new BaseRepository<AccountDocument, AccountCreateData>(
    AccountModel
  );

const accountRepository =
  new AccountRepository(baseAccountRepository);

  
const createCompanyRequest =
  new CreateCompanyRequest(
    companyRequestRepository,
    accountRepository
  );


const approveCompanyRequest =
  new ApproveCompanyRequest(
    companyRequestRepository
  );


const rejectCompanyRequest =
  new RejectCompanyRequest(
    companyRequestRepository
  );


const requestMoreInfo =
  new MoreInfoCompanyrequest(
    companyRequestRepository
  );


const resubmitCompanyRequest =
  new ResubmitCompanyRequest(
    companyRequestRepository
  );


const updateCompanyRequest =
  new UpdateCompanyRequest(
    companyRequestRepository
  );

const updateCompanyLocation =
  new UpdateCompanyLocation(
    companyRequestRepository,
    accountRepository
  );
 
  const getCompanyRequest =
  new GetCompanyRequest(
    companyRequestRepository,
    accountRepository
  );
  const baseNotificationRepository =
    new BaseRepository<
      NotificationDocument,
      NotificationCreateData
    >(NotificationModel);
  
const notificationRepository =
  new NotificationRepository(
    baseNotificationRepository
  );
  const createNotification =
  new CreateNotification(
    notificationRepository
  );
  const completeCompanyRegistration =
  new CompleteCompanyRegistration(
    accountRepository,
    createNotification

  );

  const fileStorage = new S3FileStorage();
  const updateCompanyDocuments =
  new UpdateCompanyDocuments(
    companyRequestRepository,
    fileStorage
  );
  const submitCompanyDocuments =
  new SubmitCompanyDocuments(
    companyRequestRepository,
    accountRepository
  );
  const getAllCompanyRequest =
  new GetAllCompanyRequests(
    companyRequestRepository,
    accountRepository
  );
export const companyRequestController =
  new CompanyRequestController(
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
       
       
  );