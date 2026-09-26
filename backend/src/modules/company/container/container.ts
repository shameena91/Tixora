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

import { UpdateCompanyLogo } from "../application/usecases/UpdateCompanyLogo";
import { GetCompanyDocumentUrl } from "../application/usecases/GetCompanyDocumentUrl";
import { UpdateCompanyDocumentStatusUseCase } from "../application/usecases/UpdateCompanyDocumentStatus";
import { CreateCompany } from "../application/usecases/CreateCompany";
import { CompanyRepository } from "../Infrastructure/database/repositories/CompanyRepository";
import { CompanyDocument, CompanyModel } from "../Infrastructure/database/models/CompanyModel";
import { CompanyCreateData } from "../application/mappers/CompanyMapper";
import { GetMyCompanyRequestStatus } from "../application/usecases/GetMyCompanyRequestStatus";
import { CreateTimeline } from "../../timeline/application/usecases/CreateTimeline";
import { createTimeline, timelineRepository } from "../../timeline/containers/container";

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
 const fileStorage = new S3FileStorage();
  
const createCompanyRequest =
  new CreateCompanyRequest(
    companyRequestRepository,
    accountRepository,
    fileStorage,
    createTimeline
  );

const baseCompanyrepository=new BaseRepository<
CompanyDocument,
    CompanyCreateData>(CompanyModel)
  const comapnyRepository=new CompanyRepository(baseCompanyrepository)
const createCompany=new CreateCompany(comapnyRepository)
const approveCompanyRequest =
  new ApproveCompanyRequest(
    companyRequestRepository,
    createCompany,
    createTimeline

  );


const rejectCompanyRequest =
  new RejectCompanyRequest(
    companyRequestRepository,
    createTimeline
  );


const requestMoreInfo =
  new MoreInfoCompanyrequest(
    companyRequestRepository,
    createTimeline
  );


const resubmitCompanyRequest =
  new ResubmitCompanyRequest(
    companyRequestRepository,
    createTimeline
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

 
  const getCompanyRequest =
  new GetCompanyRequest(
    companyRequestRepository,
    accountRepository,
    fileStorage
  );
const updateCompanyLogo =
  new UpdateCompanyLogo(
    
    fileStorage
  );

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
  const getMyCompanyRequest=new GetMyCompanyRequestStatus(
    companyRequestRepository
  )

  const getCompanyDocumentUrl=new GetCompanyDocumentUrl(
companyRequestRepository,
    fileStorage

  )

  const updateCompanyDocumentStatus=new UpdateCompanyDocumentStatusUseCase(
    companyRequestRepository,
    createTimeline
  )
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
    getMyCompanyRequest,
    updateCompanyLogo,
    getCompanyDocumentUrl,
    updateCompanyDocumentStatus
       
       
  );