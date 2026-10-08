import { Request, Response } from "express";

import { IGetCompanies } from "../../application/abstraction/company/IGetCompanies";
import { IGetCompanyDetails } from "../../application/abstraction/company/IgetCompanyDetails";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";
import { IGetCompanyAdmins } from "../../application/abstraction/company/IGetCompanyAdmins";
import { IUpdateCompanyStatus } from "../../application/abstraction/company/IUpdateCompanyStatus";
import { CompanyStatus } from "../../domain/entities/Company";
import { PAGINATION } from "../../../../shared/constants/paginationConstatnt";
import { IGetMyCompanyDetails } from "../../application/abstraction/company/IGetMyCompanyDetails";
import { IGetMyCompanyDocuments } from "../../application/abstraction/company-requests/IGetMyCompanyDocuments.tsIGetMyCompanyDocuments";

export class CompanyController {
  constructor(
    private readonly _getCompanies: IGetCompanies,
    private readonly _getCompanyDetails: IGetCompanyDetails,
    private readonly _getCompanyAdmin: IGetCompanyAdmins,
    private readonly _updateCompanyStatus: IUpdateCompanyStatus,
     private readonly _getMyCompanyDetails: IGetMyCompanyDetails,
       private readonly _getMyCompanyDocuments: IGetMyCompanyDocuments,
  ) {}

 async getAllCompanies(
  req: Request,
  res: Response,
) {
  const search =
    typeof req.query.search === "string"
      ? req.query.search.trim()
      : undefined;

 const page =
  typeof req.query.page === "string"
    ? Number(req.query.page)
    : PAGINATION.DEFAULT_PAGE;

const limit =
  typeof req.query.limit === "string"
    ? Number(req.query.limit)
    : PAGINATION.DEFAULT_LIMIT;

  const companies =
    await this._getCompanies.execute(
      search,
      page,
      limit,
    );

  return sendSuccess(
    res,
    MESSAGES.COMPANY_LIST_FETCHED,
    companies,
    HttpStatusCode.OK,
  );
}
  async GetCompany(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const company = await this._getCompanyDetails.execute(id);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_DETAILS_FETCHED,
      company,
      HttpStatusCode.OK,
    );
  }

  async getCompanyAdmin(req: Request, res: Response) {
    const { companyId } = req.params;

    if (typeof companyId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const companyAdmin = await this._getCompanyAdmin.execute(companyId);

    return sendSuccess(
      res,
      MESSAGES.COMPANY_DETAILS_FETCHED,
      companyAdmin,
      HttpStatusCode.OK,
    );
  }

  async updateCompanyStatus(req: Request, res: Response) {
    const { companyId } = req.params;

    const { status } = req.body;

    if (typeof companyId !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const updatedCompany = await this._updateCompanyStatus.execute(
      companyId,
      status as CompanyStatus,
    );

    return sendSuccess(
      res,
      "Company status updated successfully",
      updatedCompany,
      HttpStatusCode.OK,
    );
  }
async getMyCompany(req: Request, res: Response) {
  const accountId = req.user?.accountId;


  console.log("getMyCompany",accountId)
  if (!accountId) {
    return sendError(
      res,
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const company = await this._getMyCompanyDetails.execute(accountId);

  return sendSuccess(
    res,
    MESSAGES.COMPANY_DETAILS_FETCHED,
    company,
    HttpStatusCode.OK,
  );
}
  async getMyCompanyDocuments(
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

  const documents =
    await this._getMyCompanyDocuments.execute(
      accountId,
    );

  return sendSuccess(
    res,
     MESSAGES.COMPANY_DOCUMENTS_FETCHED,
    documents,
    HttpStatusCode.OK,
  );
}
}
