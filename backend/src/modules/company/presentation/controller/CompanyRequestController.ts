import { Request, Response } from "express";


import { AppErrors } from "../../../../shared/errors/AppErrors";
import { CompleteCompanyRegistration } from "../../application/usecases/CompleteCompanyRegistration";
import { CreateCompanyRequest } from "../../application/usecases/CreateCompanyRequest";
import { GetCompanyRequest } from "../../application/usecases/GetCompanyRequest";
import { MoreInfoCompanyrequest } from "../../application/usecases/MoreInfoCompanyRequest";
import { RejectCompanyRequest } from "../../application/usecases/RejectCompanyRequest";
import { ResubmitCompanyRequest } from "../../application/usecases/ResubmitCompanyRequest";
import { SubmitCompanyDocuments } from "../../application/usecases/SubmitCompanyDocuments";
import { UpdateCompanyDocuments } from "../../application/usecases/UpdateCompanyDocuments";
import { UpdateCompanyLocation } from "../../application/usecases/UpdateCompanyLocation";
import { UpdateCompanyRequest } from "../../application/usecases/UpdateCompanyRequest";
import { updateCompanyLocationSchema } from "../../application/Validators/UpdateCompanyLocationSchema";
import { updateCompanyRequestSchema } from "../../application/Validators/UpdateCompanyRequestSchema";
import { CompanyType, EmployeeCountRange } from "../../domain/entities/CompanyRequest";
import { CompanyDocumentFile } from "../../domain/types/CompanyDocumentFile";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
import { CompanyDocumentType } from "../../domain/value-objects/CompanyDocuments";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { IApproveCompanyRequest } from "../../application/abstraction/IApproveCompanyrequest";
import { ICompleteCompanyRegistration } from "../../application/abstraction/ICompleteCompanyRegistration";
import { ICreateCompanyRequest } from "../../application/abstraction/ICreateCompanyRequest";
import { IRejectCompanyRequest } from "../../application/abstraction/IRejectCompanyRequest";
import { IMoreInfoCompanyRequest } from "../../application/abstraction/IMoreInfoCompanyRequest";
import { IGetCompanyRequest } from "../../application/abstraction/IGetCompanyRequest";
import { IUpdateCompanyLocation } from "../../application/abstraction/IUpdateCompanyLocation";
import { IResubmitCompanyRequest } from "../../application/abstraction/IResubmitCompanyRequest";
import { IUpdateCompanyRequest } from "../../application/abstraction/IUpdateCompanyRequest";
import { IUpdateCompanyDocuments } from "../../application/abstraction/IUpdateCompanyDocuments";
import { ISubmitCompanyDocuments } from "../../application/abstraction/ISubmitCompanyDocuments";
export class CompanyRequestController {
constructor(
private readonly createCompanyRequest: ICreateCompanyRequest,
private readonly approveCompanyRequest: IApproveCompanyRequest,
private readonly rejectCompanyRequest: IRejectCompanyRequest,
private readonly requestMoreInfo: IMoreInfoCompanyRequest,
private readonly resubmitCompanyRequest: IResubmitCompanyRequest,
private readonly updateCompanyRequest: IUpdateCompanyRequest,
private readonly updateCompanyLocation:IUpdateCompanyLocation,
private readonly updateCompanyDocuments: IUpdateCompanyDocuments,
private readonly getCompanyRequest: IGetCompanyRequest,
private readonly completeCompanyRegistration:ICompleteCompanyRegistration,
private readonly submitCompanyDocuments: ISubmitCompanyDocuments
) {}


// during creation
async create(
  req: Request,
  res: Response
): Promise<void> {

  const companyRequest =
    await this.createCompanyRequest.execute(req.body);

  console.log("company data:", companyRequest);

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company request created successfully",
    data: companyRequest,
  });
}
async updateLocation(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {

  const { id } = req.params;

  const validatedData =
    updateCompanyLocationSchema.parse(req.body);

  const companyRequest =
    await this.updateCompanyLocation.execute(
      id,
      validatedData
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company location updated successfully",
    data: companyRequest,
  });
}
async updateDocuments(
  req: Request<{ companyRequestId: string }>,
  res: Response
): Promise<void> {

  const { companyRequestId } = req.params;

  const file = req.file;

  if (!file) {
    throw new AppErrors(
      "Document file is required",
       HttpStatusCode.BAD_REQUEST
    );
  }

  const { documentType } = req.body;

  if (
    !documentType ||
    !Object.values(CompanyDocumentType).includes(documentType)
  ) {
    throw new AppErrors(
      "Document type is required",
      HttpStatusCode.BAD_REQUEST
    );
  }

  const document: CompanyDocumentFile = {
    documentType,
    file: file.buffer,
    fileName: file.originalname,
    mimeType: file.mimetype,
  };

  const companyRequest =
    await this.updateCompanyDocuments.execute(
      companyRequestId,
      document
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Document uploaded successfully",
    data: companyRequest,
  });
}
async submitDocuments(
  req: Request<{ companyRequestId: string }>,
  res: Response
): Promise<void> {

  const { companyRequestId } = req.params;

  const companyRequest =
    await this.submitCompanyDocuments.execute(
      companyRequestId
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company documents submitted successfully",
    data: companyRequest,
  });
}

// it shows company details in review page
async getById(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const { id } = req.params;

  // if (typeof id !== "string") {
  //   res.status(400).json({
  //     success: false,
  //     message: "Invalid company request id",
  //   });
  //   return;
  // }

  
    const companyRequest =
      await this.getCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company request fetched successfully",
    data: companyRequest,
  });
  
}
// Complete registration
async submit(
  req: Request,
  res: Response
): Promise<void> {
  const { accountId } = req.body;
    await this.completeCompanyRegistration.execute(
      accountId
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Company registration submitted successfully",
    });
}




async approve(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {

  const { id } = req.params;

  const companyRequest =
    await this.approveCompanyRequest.execute(id);

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company request Approved Successfully",
    data: companyRequest,
  });
}
async reject(
  req: Request<{id:string}>,
  res: Response
): Promise<void> {
  const { id } = req.params;
  
    const companyRequest =
      await this.rejectCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Company request rejected successfully",
      data: companyRequest,
    });
  
}
async moreInfo(
  req: Request<{id:string}>,
  res: Response
): Promise<void> {
  const { id } = req.params;
    const companyRequest =
      await this.requestMoreInfo.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "More information requested successfully",
      data: companyRequest,
    });

}
// / after admin ask for more info can edit our details
async update(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {

  const { id } = req.params;

  const validatedData =
    updateCompanyRequestSchema.parse(req.body);

  const updateData: UpdateCompanyRequestData =
    validatedData;

  const companyRequest =
    await this.updateCompanyRequest.execute(
      id,
      updateData
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company request updated successfully",
    data: companyRequest,
  });
}
async resubmit(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {

  const { id } = req.params;

  const companyRequest =
    await this.resubmitCompanyRequest.execute(id);

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Company request resubmitted successfully",
    data: companyRequest,
  });
}

async getCompanyTypes(req:Request,res:Response):Promise<void>
{ res.status(HttpStatusCode.OK).json({
    success: true,
    data: Object.values(CompanyType),
  });
}

async getEmployeeRange(req:Request,res:Response):Promise<void>{
  res.status(HttpStatusCode.OK).json({
    success:true,
    data:Object.values(EmployeeCountRange)
  })
}
}