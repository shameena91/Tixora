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


const companyRequestRepository =
  new CompanyRequestRepository();


const accountRepository =
  new AccountRepository();
  
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
  const updateCompanyDocuments =
  new UpdateCompanyDocuments(
    companyRequestRepository,
    accountRepository
  );
  const getCompanyRequest =
  new GetCompanyRequest(
    companyRequestRepository
  );
  const completeCompanyRegistration =
  new CompleteCompanyRegistration(
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
     completeCompanyRegistration
  );