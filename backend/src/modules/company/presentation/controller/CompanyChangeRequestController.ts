import { Request, Response } from "express";


import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { sendError, sendSuccess } from "../../../../presentation/response/ResponseHelper";
import { MESSAGES } from "../../../../shared/constants/messages";
import { ICreateCompanyProfileChangeRequest } from "../../application/abstraction/companyUpdaterequests/ICreateCompanyProfileChangeRequest";
import { ICreateCompanyDocumentChangeRequest } from "../../application/abstraction/companyUpdaterequests/ICreateCompanyDocumentChangeRequest";
import { companyDocumentFileSchema, createCompanyDocumentChangeSchema } from "../../application/Validators/CompanyDocumentChangeValidation";
import { CompanyChangeRequestType } from "../../domain/types/CompanyChangeRequestType";
import { IGetCompanyChangeRequests } from "../../application/abstraction/companyUpdaterequests/IGetCompanyChangeRequests";
import { CompanyProfileChangeStatus, CompanyProfileField, CompanyProfileFieldChangeStatus } from "../../domain/entities/CompanyProfileChange";
import { IGetCompanyChangeRequestById } from "../../application/abstraction/companyUpdaterequests/IGetCompanyChangeRequestById";
import { IReviewCompanyDocumentChangeRequest } from "../../application/abstraction/companyUpdaterequests/IReviewCompanyDocumentChangeRequest";
import { ReviewCompanyDocumentChangeRequestDTO } from "../../application/dto/ReviewCompanyDocumentChangeDTO";
import { IReviewCompanyProfileChangeRequest } from "../../application/abstraction/companyUpdaterequests/IReviewCompanyProfileChangeRequest";
import { ReviewCompanyProfileChangeRequestDTO } from "../../application/dto/ReviewCompanyProfileChangeDTO";
import { ISendCompanyEmailChangeOtp } from "../../application/abstraction/companyUpdaterequests/ISendCompanyEmailChangeOtp";
import { IVerifyCompanyEmailChangeOtp } from "../../application/abstraction/companyUpdaterequests/IVerifyCompanyEmailChangeOtp";

export class CompanyChangeRequestController {
  constructor(
    private readonly _createCompanyProfileChangeRequest: ICreateCompanyProfileChangeRequest,
        private readonly _createCompanyDocumentChangeRequest: ICreateCompanyDocumentChangeRequest,
   private readonly _getCompanyChangeRequests: IGetCompanyChangeRequests,
     private readonly _getCompanyChangeRequestById: IGetCompanyChangeRequestById,
 
 
  private readonly _reviewCompanyProfileChangeRequest:
  IReviewCompanyProfileChangeRequest,

 
 
 
     private readonly _reviewCompanyDocumentChangeRequest:
  IReviewCompanyDocumentChangeRequest,

     private readonly _sendCompanyEmailChangeOtp:
  ISendCompanyEmailChangeOtp,
  private readonly _verifyCompanyEmailChangeOtp:
  IVerifyCompanyEmailChangeOtp

) {}

  async createProfileChangeRequest(
    req: Request,
    res: Response,
  ) {
    const accountId = req.user?.accountId;

    if (!accountId) {
      return sendError(
        res,
        MESSAGES.UNAUTHORIZED,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    if (
      !req.body ||
      !Array.isArray(req.body.profileChanges)
    ) {
      return sendError(
        res,
        "Invalid company profile change request",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const result =
      await this._createCompanyProfileChangeRequest.execute(
        accountId,
        req.body,
      );

    return sendSuccess(
      res,
      "Company profile change request submitted successfully",
      result,
      HttpStatusCode.CREATED,
    );
  }

 async createDocumentChangeRequest(
    req: Request,
    res: Response,
  ) {
    const accountId = req.user?.accountId;

    if (!accountId) {
      return sendError(
        res,
        MESSAGES.UNAUTHORIZED,
        HttpStatusCode.UNAUTHORIZED,
      );
    }

    const dtoResult = createCompanyDocumentChangeSchema.safeParse(
      req.body,
    );

    if (!dtoResult.success) {
      return sendError(
        res,
        dtoResult.error.issues[0]?.message ??
          "Invalid document change request",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const fileResult = companyDocumentFileSchema.safeParse(
      req.file,
    );

    if (!fileResult.success) {
      return sendError(
        res,
        fileResult.error.issues[0]?.message ??
          "Invalid document file",
        HttpStatusCode.BAD_REQUEST,
      );
    }
console.log("RESULT",dtoResult.data)
    const result =
      await this._createCompanyDocumentChangeRequest.execute(
        accountId,
        dtoResult.data,
        fileResult.data,
       
      );

    return sendSuccess(
      res,
      "Company document change request submitted successfully",
      result,
      HttpStatusCode.CREATED,
    );
  }



  async getAllChangeRequests(req: Request, res: Response) {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      100,
      Math.max(1, Number(req.query.limit) || 10),
    );

    const result = await this._getCompanyChangeRequests.execute({
      page,
      limit,
      search:
        typeof req.query.search === "string"
          ? req.query.search.trim() || undefined
          : undefined,
      status:
        typeof req.query.status === "string"
          ? req.query.status as CompanyProfileChangeStatus
          : undefined,
      changeType:
        typeof req.query.changeType === "string"
          ? req.query.changeType as CompanyChangeRequestType
          : undefined,
    });

    return sendSuccess(
      res,
      "Company update requests fetched successfully",
      result,
      HttpStatusCode.OK,
    );
  }


  async getChangeRequestById(req: Request, res: Response) {
  const { requestId } = req.params;

 if (typeof requestId !== "string" || !requestId.trim()) {
    return sendError(
      res,
      "Invalid company update request ID",
      HttpStatusCode.BAD_REQUEST,
    );
  }
console.log("getChangeRequestById",requestId)
  const result =
    await this._getCompanyChangeRequestById.execute(requestId);

  return sendSuccess(
    res,
    "Company update request details fetched successfully",
    result,
    HttpStatusCode.OK,
  );
}

async reviewDocumentChangeRequest(
  req: Request,
  res: Response,
) {
  const requestId = req.params.requestId;
  const reviewerId = req.user?.accountId;

  if (!reviewerId) {
    return sendError(
      res,
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  if (typeof requestId !== "string" || !requestId.trim()) {
    return sendError(
      res,
      "Invalid company document change request ID",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const { decision, remarks } = req.body;

  if (decision !== "APPROVE" && decision !== "REJECT") {
    return sendError(
      res,
      "Decision must be APPROVE or REJECT",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  if (remarks !== undefined && typeof remarks !== "string") {
    return sendError(
      res,
      "Remarks must be a string",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const dto: ReviewCompanyDocumentChangeRequestDTO = {
    decision,
    ...(remarks !== undefined ? { remarks } : {}),
  };

  const result =
    await this._reviewCompanyDocumentChangeRequest.execute(
      requestId,
      reviewerId,
      dto,
    );

  return sendSuccess(
    res,
    `Company document change request ${decision === "APPROVE" ? "approved" : "rejected"} successfully`,
    result,
    HttpStatusCode.OK,
  );
}

async reviewProfileChangeRequest(
  req: Request,
  res: Response,
) {
  const requestId = req.params.requestId;
  const reviewerId = req.user?.accountId;

  if (!reviewerId) {
    return sendError(
      res,
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  if (typeof requestId !== "string" || !requestId.trim()) {
    return sendError(
      res,
      "Invalid company profile change request ID",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const { field, decision, remarks } = req.body;

  if (
    typeof field !== "string" ||
    !Object.values(CompanyProfileField).includes(
      field as CompanyProfileField,
    )
  ) {
    return sendError(
      res,
      "Invalid profile field",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  if (
    decision !== CompanyProfileFieldChangeStatus.APPROVED &&
    decision !== CompanyProfileFieldChangeStatus.REJECTED
  ) {
    return sendError(
      res,
      "Decision must be APPROVED or REJECTED",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  if (remarks !== undefined && typeof remarks !== "string") {
    return sendError(
      res,
      "Remarks must be a string",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const dto: ReviewCompanyProfileChangeRequestDTO = {
    field: field as CompanyProfileField,
    decision,
    ...(remarks !== undefined ? { remarks } : {}),
  };

  const result =
    await this._reviewCompanyProfileChangeRequest.execute(
      requestId,
      reviewerId,
      dto,
    );

  return sendSuccess(
    res,
    `Profile field ${decision.toLowerCase()} successfully`,
    result,
    HttpStatusCode.OK,
  );
}

async sendCompanyEmailChangeOtp(
  req: Request,
  res: Response,
 
): Promise<void> {
 
    const { email } = req.body;

    await this._sendCompanyEmailChangeOtp.execute(email);

    sendSuccess(
      res,
   
      "OTP sent successfully",
         HttpStatusCode.OK,
    );
  } 

  async verifyCompanyEmailChangeOtp(
  req: Request,
  res: Response,
): Promise<void> {
  const { email, otp } = req.body as {
    email: string;
    otp: string;
  };


  const accountId = req.user!.accountId;

  await this._verifyCompanyEmailChangeOtp.execute(
    accountId,
    email,
    otp,
  );

  sendSuccess(
    res,
    "Company email updated successfully",
    HttpStatusCode.OK,
    
  );
}
}

