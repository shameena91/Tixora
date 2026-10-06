import { Request, Response } from "express";

import { IGetCompanyDetails } from "../../application/abstraction/IgetCompanyDetails";
import { IGetCompanies } from "../../application/abstraction/IGetCompanies";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";
import { IGetCompanyAdmins } from "../../application/abstraction/IGetCompanyAdmins";
import { IUpdateCompanyStatus } from "../../application/abstraction/IUpdateCompanyStatus";
import { CompanyStatus } from "../../domain/entities/Company";

export class CompanyController {
  constructor(
    private readonly _getCompanies: IGetCompanies,
    private readonly _getCompanyDetails: IGetCompanyDetails,
    private readonly _getCompanyAdmin: IGetCompanyAdmins,
    private readonly _updateCompanyStatus: IUpdateCompanyStatus,
  ) {}

  async getAllCompanies(req: Request, res: Response) {
    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : undefined;

    const companies = await this._getCompanies.execute(search);

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
}
