import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import { UpdateCompanyDocumentStatusUseCase } from "../../application/usecases/companyRequests/UpdateCompanyDocumentStatus";

import { updateCompanyLocationSchema } from "../../application/Validators/UpdateCompanyLocationSchema";
import { updateCompanyRequestSchema } from "../../application/Validators/UpdateCompanyRequestSchema";

import {
  CompanyType,
  EmployeeCountRange,
} from "../../domain/entities/CompanyRequest";

import {
  CompanyDocumentFile,
  CompanyLogoFile,
} from "../../domain/types/CompanyDocumentFile";

import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";

import {
  CompanyDocumentType,
  DocumentVerificationStatus,
} from "../../domain/value-objects/CompanyDocuments";

import { IApproveCompanyRequest } from "../../application/abstraction/IApproveCompanyrequest";
import { ICompleteCompanyRegistration } from "../../application/abstraction/ICompleteCompanyRegistration";
import { ICreateCompanyRequest } from "../../application/abstraction/ICreateCompanyRequest";
import { IGetAllCompanyRequest } from "../../application/abstraction/IGetAllCompanyRequest";
import { IGetCompanyDocumentUrl } from "../../application/abstraction/IGetCompanyDocumentUrl";
import { IGetCompanyRequest } from "../../application/abstraction/IGetCompanyRequest";
import { IGetMyCompanyRequestStatus } from "../../application/abstraction/IGetMyCompanyRequestStatus";
import { IMoreInfoCompanyRequest } from "../../application/abstraction/IMoreInfoCompanyRequest";
import { IRejectCompanyRequest } from "../../application/abstraction/IRejectCompanyRequest";
import { IResubmitCompanyRequest } from "../../application/abstraction/IResubmitCompanyRequest";
import { ISubmitCompanyDocuments } from "../../application/abstraction/ISubmitCompanyDocuments";
import { IUpdateCompanyDocuments } from "../../application/abstraction/IUpdateCompanyDocuments";
import { IUpdateCompanyLocation } from "../../application/abstraction/IUpdateCompanyLocation";
import { IUpdateCompanyLogo } from "../../application/abstraction/IUpdateCompanyLogo";
import { IUpdateCompanyRequest } from "../../application/abstraction/IUpdateCompanyRequest";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

export class CompanyRequestController {
  constructor(
    private readonly _createCompanyRequest: ICreateCompanyRequest,
    private readonly _approveCompanyRequest: IApproveCompanyRequest,
    private readonly _rejectCompanyRequest: IRejectCompanyRequest,
    private readonly _requestMoreInfo: IMoreInfoCompanyRequest,
    private readonly _resubmitCompanyRequest: IResubmitCompanyRequest,
    private readonly _updateCompanyRequest: IUpdateCompanyRequest,
    private readonly _updateCompanyLocation: IUpdateCompanyLocation,
    private readonly _updateCompanyDocuments: IUpdateCompanyDocuments,
    private readonly _getCompanyRequest: IGetCompanyRequest,
    private readonly _getAllCompanyRequests: IGetAllCompanyRequest,
    private readonly _completeCompanyRegistration: ICompleteCompanyRegistration,
    private readonly _submitCompanyDocuments: ISubmitCompanyDocuments,
    private readonly _getMyCompanyRequest: IGetMyCompanyRequestStatus,
    private readonly _updateCompanyLogo: IUpdateCompanyLogo,
    private readonly _getCompanyDocumentUrlUseCase: IGetCompanyDocumentUrl,
    private readonly _updateCompanyDocumentStatus: UpdateCompanyDocumentStatusUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const companyRequest = await this._createCompanyRequest.execute({
      ...req.body,
    });

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_CREATED,
      companyRequest,
      HttpStatusCode.CREATED,
    );
  }

  async updateLocation(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const validatedData = updateCompanyLocationSchema.parse(req.body);

    const companyRequest = await this._updateCompanyLocation.execute(
      id,
      validatedData,
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_LOCATION_UPDATED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async updateDocuments(req: Request, res: Response) {
    const { companyRequestId } = req.params;

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const file = req.file;

    if (!file) {
      throw new AppErrors(
        MESSAGES.DOCUMENT_FILE_REQUIRED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const { documentType } = req.body;

    if (
      !documentType ||
      !Object.values(CompanyDocumentType).includes(documentType)
    ) {
      throw new AppErrors(
        MESSAGES.DOCUMENT_TYPE_REQUIRED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const document: CompanyDocumentFile = {
      documentType,
      file: file.buffer,
      fileName: file.originalname,
      mimeType: file.mimetype,
    };

    const companyRequest = await this._updateCompanyDocuments.execute(
      companyRequestId,
      document,
    );

    return sendSuccess(
      res,
      MESSAGES.DOCUMENT_UPLOADED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async submitDocuments(req: Request, res: Response) {
    const { companyRequestId } = req.params;

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const companyRequest =
      await this._submitCompanyDocuments.execute(companyRequestId);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_DOCUMENTS_SUBMITTED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async updateLogo(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      throw new AppErrors(
        MESSAGES.LOGO_FILE_REQUIRED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const logo: CompanyLogoFile = {
      file: file.buffer,
      fileName: file.originalname,
      mimeType: file.mimetype,
    };

    const logoUrl = await this._updateCompanyLogo.execute(logo);

    return sendSuccess(
      res,
      MESSAGES.LOGO_UPLOADED,
      {
        logo: logoUrl,
      },
      HttpStatusCode.OK,
    );
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const companyRequest = await this._getCompanyRequest.execute(id);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_FETCHED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async submit(req: Request, res: Response) {
    const { accountId } = req.body;
    const { companyRequestId } = req.params;

    if (typeof companyRequestId !== "string") {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    await this._completeCompanyRegistration.execute(
      accountId,
      companyRequestId,
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REGISTRATION_SUBMITTED,
      undefined,
      HttpStatusCode.OK,
    );
  }

  async approve(req: Request, res: Response) {
    const { id } = req.params;
    const reviewedBy = req.user?.accountId;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (!reviewedBy) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    const companyRequest = await this._approveCompanyRequest.execute(
      id,
      reviewedBy,
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_APPROVED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async reject(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const companyRequest = await this._rejectCompanyRequest.execute(id);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_REJECTED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async moreInfo(req: Request, res: Response) {
    const { id } = req.params;
    const { remarks } = req.body;
    const reviewedBy = req.user?.accountId;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (!reviewedBy) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    const companyRequest = await this._requestMoreInfo.execute(
      id,
      reviewedBy,
      remarks,
    );

    return sendSuccess(
      res,
      MESSAGES.MORE_INFORMATION_REQUESTED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const validatedData = updateCompanyRequestSchema.parse(req.body);

    const updateData: UpdateCompanyRequestData = validatedData;

    const companyRequest = await this._updateCompanyRequest.execute(
      id,
      updateData,
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_UPDATED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async resubmit(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const companyRequest = await this._resubmitCompanyRequest.execute(id);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_RESUBMITTED,
      companyRequest,
      HttpStatusCode.OK,
    );
  }

  async getCompanyTypes(req: Request, res: Response) {
    return sendSuccess(
      res,
      "Company types fetched successfully",
      Object.values(CompanyType),
      HttpStatusCode.OK,
    );
  }

  async getEmployeeRange(req: Request, res: Response) {
    return sendSuccess(
      res,
      "Employee ranges fetched successfully",
      Object.values(EmployeeCountRange),
      HttpStatusCode.OK,
    );
  }

  async getAll(req: Request, res: Response) {
    const companyRequests = await this._getAllCompanyRequests.execute();

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_FETCHED,
      companyRequests,
      HttpStatusCode.OK,
    );
  }

  async getMyRequest(req: Request, res: Response) {
    const accountId = req.user?.accountId;

    if (!accountId) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    const result = await this._getMyCompanyRequest.execute(accountId);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_FETCHED,
      result,
      HttpStatusCode.OK,
    );
  }

  async getCompanyDocumentViewUrl(req: Request, res: Response) {
    const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const signedUrl = await this._getCompanyDocumentUrlUseCase.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      "view",
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_FETCHED,
      {
        url: signedUrl,
      },
      HttpStatusCode.OK,
    );
  }

  async getCompanyDocumentDownloadUrl(req: Request, res: Response) {
    const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const signedUrl = await this._getCompanyDocumentUrlUseCase.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      "download",
    );

    return sendSuccess(
      res,
      MESSAGES.COMPANY_REQUEST_FETCHED,
      {
        url: signedUrl,
      },
      HttpStatusCode.OK,
    );
  }

  async verifyCompanyDocument(req: Request, res: Response) {
    const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await this._updateCompanyDocumentStatus.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      DocumentVerificationStatus.VERIFIED,
    );

    return sendSuccess(
      res,
      MESSAGES.DOCUMENT_VERIFIED,
      undefined,
      HttpStatusCode.OK,
    );
  }

  async rejectCompanyDocument(req: Request, res: Response) {
    const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    await this._updateCompanyDocumentStatus.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      DocumentVerificationStatus.REJECTED,
    );

    return sendSuccess(
      res,
      MESSAGES.DOCUMENT_REJECTED,
      undefined,
      HttpStatusCode.OK,
    );
  }
}
