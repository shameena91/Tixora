import { CompanyRequestRepository } from "../Infrastructure/database/repositories/CompanyRequestRepository";

import { CreateCompanyRequest } from "../application/usecases/CreateCompanyRequest";
import { ApproveCompanyRequest } from "../application/usecases/ApproveCompanyRequest";
import { RejectCompanyRequest } from "../application/usecases/RejectCompanyRequest";
import { MoreInfoCompanyrequest } from "../application/usecases/MoreInfoCompanyRequest";
import { ResubmitCompanyRequest } from "../application/usecases/ResubmitCompanyRequest";
import { UpdateCompanyRequest } from "../application/usecases/UpdateCompanyRequest";

import { CompanyRequestController } from "../presentation/controller/CompanyRequestController";


const companyRequestRepository =
  new CompanyRequestRepository();


const createCompanyRequest =
  new CreateCompanyRequest(
    companyRequestRepository
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


export const companyRequestController =
  new CompanyRequestController(
    createCompanyRequest,
    approveCompanyRequest,
    rejectCompanyRequest,
    requestMoreInfo,
    resubmitCompanyRequest,
    updateCompanyRequest
  );