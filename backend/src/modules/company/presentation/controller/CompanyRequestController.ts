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
import {
  CompanyType,
  EmployeeCountRange,
} from "../../domain/entities/CompanyRequest";
import {
  CompanyDocumentFile,
  CompanyLogoFile,
} from "../../domain/types/CompanyDocumentFile";
import { UpdateCompanyRequestData } from "../../domain/types/UpdateCompanyRequesstData";
import { CompanyDocumentType, DocumentVerificationStatus } from "../../domain/value-objects/CompanyDocuments";
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
import { IGetMyCompanyRequest } from "../../application/abstraction/IGetMyCompanyRequest";
import { IGetAllCompanyRequest } from "../../application/abstraction/IGetAllCompanyRequest";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IUpdateCompanyLogo } from "../../application/abstraction/IUpdateCompanyLogo";
import { IGetCompanyDocumentUrl } from "../../application/abstraction/IGetCompanyDocumentUrl";
import { UpdateCompanyDocumentStatusUseCase } from "../../application/usecases/UpdateCompanyDocumentStatus";


export class CompanyRequestController {
  constructor(
    private readonly createCompanyRequest: ICreateCompanyRequest,
    private readonly approveCompanyRequest: IApproveCompanyRequest,
    private readonly rejectCompanyRequest: IRejectCompanyRequest,
    private readonly requestMoreInfo: IMoreInfoCompanyRequest,
    private readonly resubmitCompanyRequest: IResubmitCompanyRequest,
    private readonly updateCompanyRequest: IUpdateCompanyRequest,
    private readonly updateCompanyLocation: IUpdateCompanyLocation,
    private readonly updateCompanyDocuments: IUpdateCompanyDocuments,
    private readonly getCompanyRequest: IGetCompanyRequest,
    private readonly getAllCompanyRequests: IGetAllCompanyRequest,
    private readonly completeCompanyRegistration: ICompleteCompanyRegistration,
    private readonly submitCompanyDocuments: ISubmitCompanyDocuments,
    private readonly getMyCompanyRequest: IGetMyCompanyRequest,
    private readonly updateCompanyLogo: IUpdateCompanyLogo,
    private readonly getCompanyDocumentUrlUseCase: IGetCompanyDocumentUrl,
    private readonly updateCompanyDocumentStatus:UpdateCompanyDocumentStatusUseCase
  ) {}

  // during creation
  async create(req: Request, res: Response): Promise<void> {
    // const file = req.file; console.log("Company logo file:", file);
    const companyRequest = await this.createCompanyRequest.execute
   ({ ...req.body });;

    console.log("company data:", companyRequest);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_CREATED,
      data: companyRequest,
    });
  }
  async updateLocation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const validatedData = updateCompanyLocationSchema.parse(req.body);

    const companyRequest = await this.updateCompanyLocation.execute(
      id,
      validatedData,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_LOCATION_UPDATED,
      data: companyRequest,
    });
  }
  async updateDocuments(req: Request, res: Response): Promise<void> {
    const { companyRequestId } = req.params;
    if (typeof companyRequestId !== "string") {
      res.status(400).json({
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

    const companyRequest = await this.updateCompanyDocuments.execute(
      companyRequestId,
      document,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.DOCUMENT_UPLOADED,
      data: companyRequest,
    });
  }
  async submitDocuments(req: Request, res: Response): Promise<void> {
    const { companyRequestId } = req.params;
    if (typeof companyRequestId !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const companyRequest =
      await this.submitCompanyDocuments.execute(companyRequestId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_DOCUMENTS_SUBMITTED,
      data: companyRequest,
    });
  }

  async updateLogo(req: Request, res: Response): Promise<void> {
    const file = req.file;
    console.log("uploaded from backend", file);
    console.log(" UPDATE LOGO CONTROLLER CALLED");

    console.log(" Backend received file:", file);
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

    const logoUrl = await this.updateCompanyLogo.execute(logo);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.LOGO_UPLOADED,
      data: {
        logo: logoUrl,
      },
    });
  }

  // it shows company details in review page
  async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const companyRequest = await this.getCompanyRequest.execute(id);
    console.log("GET dataaaaaaa", companyRequest);
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: companyRequest,
    });
  }
  // Complete registration
  async submit(
    req: Request,

    res: Response,
  ): Promise<void> {
    const { accountId } = req.body;
    const { companyRequestId } = req.params;
    console.log("from controller", companyRequestId);
    if (typeof companyRequestId !== "string") {
      throw new AppErrors(
        MESSAGES.COMPANY_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }
    await this.completeCompanyRegistration.execute(accountId, companyRequestId);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REGISTRATION_SUBMITTED,
    });
  }

  async approve(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const reviewedBy = req.user?.accountId;
    console.log("idddd", req.user);
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    if (!reviewedBy) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }

    const companyRequest = await this.approveCompanyRequest.execute(
      id,
      reviewedBy,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_APPROVED,
      data: companyRequest,
    });
  }
  async reject(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const companyRequest = await this.rejectCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_REJECTED,
      data: companyRequest,
    });
  }
  async moreInfo(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const { remarks } = req.body;

    const reviewedBy = req.user?.accountId;
    if (!reviewedBy) {
      throw new AppErrors("Unauthorized", ErrorCode.UNAUTHORIZED);
    }
    const companyRequest = await this.requestMoreInfo.execute(
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
  // / after admin ask for more info can edit our details
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const validatedData = updateCompanyRequestSchema.parse(req.body);

    const updateData: UpdateCompanyRequestData = validatedData;

    const companyRequest = await this.updateCompanyRequest.execute(
      id,
      updateData,
    );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_UPDATED,
      data: companyRequest,
    });
  }
  async resubmit(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
    const companyRequest = await this.resubmitCompanyRequest.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_RESUBMITTED,
      data: companyRequest,
    });
  }

  async getCompanyTypes(req: Request, res: Response): Promise<void> {
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: Object.values(CompanyType),
    });
  }

  async getEmployeeRange(req: Request, res: Response): Promise<void> {
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: Object.values(EmployeeCountRange),
    });
  }
  async getAll(req: Request, res: Response): Promise<void> {
    const companyRequests = await this.getAllCompanyRequests.execute();

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: companyRequests,
    });
  }
  async getMyRequest(req: Request, res: Response) {
    const accountId = req.user?.accountId;
    if (!accountId) {
      throw new AppErrors(MESSAGES.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
    }
    console.log("accnt id", accountId);
    const result = await this.getMyCompanyRequest.execute(accountId);
    console.log("GET Checkkkkkkk", result);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.COMPANY_REQUEST_FETCHED,
      data: result,
    });
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
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const signedUrl = await this.getCompanyDocumentUrlUseCase.execute(
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
  async getCompanyDocumentDownloadUrl(req: Request, res: Response) {
    const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const signedUrl = await this.getCompanyDocumentUrlUseCase.execute(
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
  const { companyRequestId, documentType } = req.params;

    if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

  await this.updateCompanyDocumentStatus.execute(
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
  const { companyRequestId, documentType } = req.params;
 if (!companyRequestId || !documentType) {
      throw new AppErrors(
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        ErrorCode.COMPANY_REQUEST_NOT_FOUND,
      );
    }

    if (typeof companyRequestId !== "string") {
      res.status(400).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
  await this.updateCompanyDocumentStatus.execute(
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
