
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

  async create(req: Request, res: Response): Promise<void> {
    const companyRequest = await this._createCompanyRequest.execute({
      ...req.body,
    });

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_CREATED,
      data: companyRequest,
    });
  }

  async updateLocation(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const validatedData = updateCompanyLocationSchema.parse(req.body);

    const companyRequest =
      await this._updateCompanyLocation.execute(
        id,
        validatedData,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_LOCATION_UPDATED,
      data: companyRequest,
    });
  }

  async updateDocuments(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId } = req.params;

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
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

    const companyRequest =
      await this._updateCompanyDocuments.execute(
        companyRequestId,
        document,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.DOCUMENT_UPLOADED,
      data: companyRequest,
    });
  }

  async submitDocuments(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId } = req.params;

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const companyRequest =
      await this._submitCompanyDocuments.execute(
        companyRequestId,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_DOCUMENTS_SUBMITTED,
      data: companyRequest,
    });
  }

  async updateLogo(
    req: Request,
    res: Response,
  ): Promise<void> {
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

    const logoUrl =
      await this._updateCompanyLogo.execute(logo);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.LOGO_UPLOADED,
      data: {
        logo: logoUrl,
      },
    });
  }

  async getById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const companyRequest =
      await this._getCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: companyRequest,
    });
  }

  async submit(
    req: Request,
    res: Response,
  ): Promise<void> {
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

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REGISTRATION_SUBMITTED,
    });
  }

  async approve(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const reviewedBy = req.user?.accountId;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    if (!reviewedBy) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    const companyRequest =
      await this._approveCompanyRequest.execute(
        id,
        reviewedBy,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_APPROVED,
      data: companyRequest,
    });
  }

  async reject(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const companyRequest =
      await this._rejectCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_REJECTED,
      data: companyRequest,
    });
  }

  async moreInfo(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;
    const { remarks } = req.body;
    const reviewedBy = req.user?.accountId;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    if (!reviewedBy) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    const companyRequest =
      await this._requestMoreInfo.execute(
        id,
        reviewedBy,
        remarks,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.MORE_INFORMATION_REQUESTED,
      data: companyRequest,
    });
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const validatedData =
      updateCompanyRequestSchema.parse(req.body);

    const updateData: UpdateCompanyRequestData =
      validatedData;

    const companyRequest =
      await this._updateCompanyRequest.execute(
        id,
        updateData,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_UPDATED,
      data: companyRequest,
    });
  }

  async resubmit(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const companyRequest =
      await this._resubmitCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_RESUBMITTED,
      data: companyRequest,
    });
  }

  async getCompanyTypes(
    req: Request,
    res: Response,
  ): Promise<void> {
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: Object.values(CompanyType),
    });
  }

  async getEmployeeRange(
    req: Request,
    res: Response,
  ): Promise<void> {
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: Object.values(EmployeeCountRange),
    });
  }

  async getAll(
    req: Request,
    res: Response,
  ): Promise<void> {
    const companyRequests =
      await this._getAllCompanyRequests.execute();

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: companyRequests,
    });
  }

  async getMyRequest(
    req: Request,
    res: Response,
  ): Promise<void> {
    const accountId = req.user?.accountId;

    if (!accountId) {
      throw new AppErrors(
        MESSAGES.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
      );
    }

    const result =
      await this._getMyCompanyRequest.execute(accountId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: result,
    });
  }

  async getCompanyDocumentViewUrl(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId, documentType } =
      req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const signedUrl =
      await this._getCompanyDocumentUrlUseCase.execute(
        companyRequestId,
        documentType as CompanyDocumentType,
        "view",
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: {
        url: signedUrl,
      },
    });
  }

  async getCompanyDocumentDownloadUrl(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId, documentType } =
      req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const signedUrl =
      await this._getCompanyDocumentUrlUseCase.execute(
        companyRequestId,
        documentType as CompanyDocumentType,
        "download",
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: {
        url: signedUrl,
      },
    });
  }

  async verifyCompanyDocument(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId, documentType } =
      req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    await this._updateCompanyDocumentStatus.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      DocumentVerificationStatus.VERIFIED,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.DOCUMENT_VERIFIED,
    });
  }

  async rejectCompanyDocument(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { companyRequestId, documentType } =
      req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    await this._updateCompanyDocumentStatus.execute(
      companyRequestId,
      documentType as CompanyDocumentType,
      DocumentVerificationStatus.REJECTED,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.DOCUMENT_REJECTED,
    });
  }
}
