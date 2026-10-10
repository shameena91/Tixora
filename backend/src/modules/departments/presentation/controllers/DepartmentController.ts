import type { Request, Response } from "express";

import type { IDepartmentUseCaseFactory } from "../../application/abstarction/IDepartmentUseCaseFactory";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

import { MESSAGES } from "../../../../shared/constants/messages";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";

export class DepartmentController {
  constructor(
    private readonly _departmentUseCaseFactory: IDepartmentUseCaseFactory,
  ) {}

  async createDepartment(
    req: Request,
    res: Response,
  ): Promise<void> {
    const accountId = req.user?.accountId;

    if (typeof accountId !== "string" || !accountId) {
      sendError(
        res,
        "Authenticated account ID is missing",
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    const useCases =
      await this._departmentUseCaseFactory.createForAccount(
        accountId,
      );

    if (!useCases) {
      sendError(
        res,
        MESSAGES.COMPANY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
      return;
    }

    const department =
      await useCases.createDepartment.execute(req.body);

    sendSuccess(
      res,
      MESSAGES.DEPARTMENT_CREATED,
      department,
      HttpStatusCode.CREATED,
    );
  }

  async getDepartment(req:Request,res:Response):Promise<void>{
    const {departmentId}=req.params
     const accountId = req.user?.accountId;

    if (typeof accountId !== "string" || !accountId) {
      sendError(
        res,
        MESSAGES.AUTHENTICATED_ID_MISING,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    
    if (typeof departmentId !== "string" || !departmentId) {
      sendError(
        res,
       MESSAGES.DEPARTMENT_NOT_FOUND,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    const useCases=await this._departmentUseCaseFactory.createForAccount(
      accountId
    )
     if (!useCases) {
      sendError(
        res,
        MESSAGES.COMPANY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
      return;
    }
    const department=await useCases.getDepartment.execute(departmentId)
console.log("get daptmentcontro",department)
      sendSuccess(
    res,
    MESSAGES.DEPARTMENT_FETCHED,
    department,
    HttpStatusCode.OK,
  );
  }

  async getAllDepartments(
    req: Request,
    res: Response,
  ): Promise<void> {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1) {
      sendError(
        res,
        "Page must be a positive integer",
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    if (
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100
    ) {
      sendError(
        res,
        "Limit must be between 1 and 100",
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    const accountId = req.user?.accountId;

    if (typeof accountId !== "string" || !accountId) {
      sendError(
        res,
        "Authenticated account ID is missing",
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    const useCases =
      await this._departmentUseCaseFactory.createForAccount(
        accountId,
      );

    if (!useCases) {
      sendError(
        res,
        MESSAGES.COMPANY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
      return;
    }

    const result = await useCases.getAllDepartment.execute(
      page,
      limit,
    );

    sendSuccess(
      res,
      MESSAGES.DEPARTMENT_FETCHED,
      result,
      HttpStatusCode.OK,
    );
  }

  async updateDepartmentStatus(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user?.accountId;
  const { departmentId } = req.params;
  const { status } = req.body ?? {};

  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
       MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
    return;
  }

  if (
    typeof departmentId !== "string" ||
    !departmentId.trim()
  ) {
    sendError(
      res,
      MESSAGES.DEPARTMENT_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  if (status !== "ACTIVE" && status !== "INACTIVE") {
    sendError(
      res,
      "Status must be ACTIVE or INACTIVE",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases =
    await this._departmentUseCaseFactory.createForAccount(
      accountId,
    );

  if (!useCases) {
    sendError(
      res,
      MESSAGES.COMPANY_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
    return;
  }

  const department =
    await useCases.updateDepartmentStatus.execute(
      departmentId,
      status,
    );

  sendSuccess(
    res,
    MESSAGES.DEPARTMENT_STATUS_UPDATED,
    department,
    HttpStatusCode.OK,
  );
}

async updateDepartment(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user?.accountId;
  const { departmentId } = req.params;
  console.log("departmentId",departmentId)

  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
     MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
    return;
  }

  if (
    typeof departmentId !== "string" ||
    !departmentId.trim()
  ) {
    sendError(
      res,
      MESSAGES.DEPARTMENT_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const { name, code, description } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof code !== "string" ||
    typeof description !== "string"
  ) {
    sendError(
      res,
      "Department name, code and description are required",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases =
    await this._departmentUseCaseFactory.createForAccount(
      accountId,
    );

  if (!useCases) {
    sendError(
      res,
      MESSAGES.COMPANY_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
    return;
  }

  const department = await useCases.updateDepartment.execute(
    departmentId,
    {
      name,
      code,
      description,
    },
  );

  sendSuccess(
    res,
    MESSAGES.DEPARTMENT_UPDATED,
    department,
    HttpStatusCode.OK,
  );
}
}