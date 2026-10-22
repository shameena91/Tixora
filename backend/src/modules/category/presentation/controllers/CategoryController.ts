import type { Request, Response } from "express";
import { Types } from "mongoose";

import { CategoryStatus } from "../../domain/entities/Category";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

import { MESSAGES } from "../../../../shared/constants/messages";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { ICategoryUseCaseFactory } from "../../application/abstraction/ICategoryUseCaseFactory";
import { getUseCasesForAccount } from "../../../../presentation/response/getUseCasesForAccount";

export class CategoryController {
  constructor(
    private readonly _categoryUseCaseFactory: ICategoryUseCaseFactory,
  ) {}

 async createCategory(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user!.accountId;
  const { departmentId } = req.params;
  const { name, description } = req.body ?? {};

  if (
    typeof departmentId !== "string" ||
    !Types.ObjectId.isValid(departmentId)
  ) {
    sendError(
      res,
      MESSAGES.DEPARTMENT_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  if (
    typeof name !== "string" ||
    (description != null && typeof description !== "string")
  ) {
    sendError(
      res,
      "Category name and a valid description are required",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases = await getUseCasesForAccount(
    accountId,
    this._categoryUseCaseFactory,
    res,
  );

  if (!useCases) {
    return;
  }

  const category = await useCases.createCategory.execute(
    departmentId,
    {
      name,
      description: description ?? null,
    },
  );

  sendSuccess(
    res,
    MESSAGES.CATEGORY_CREATED,
    category,
    HttpStatusCode.CREATED,
  );
}



async getCategoryDetails(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user?.accountId;
  const { categoryId } = req.params;

  console.log(categoryId)

  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
      MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
    return;
  }

  if (
    typeof categoryId !== "string" ||
    !Types.ObjectId.isValid(categoryId)
  ) {
    sendError(
      res,
      MESSAGES.CATEGORY_NOT_FOUND,
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases = await getUseCasesForAccount(
    accountId,
    this._categoryUseCaseFactory,
    res,
  );

  if (!useCases) {
    return;
  }

  const result =
    await useCases.getCategoryDetails.execute(categoryId);

  sendSuccess(
    res,
    MESSAGES.CATEGORIES_FETCHED,
    result,
    HttpStatusCode.OK,
  );
}


async getAllCategories(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user?.accountId;

  console.log("from drpt contrioller",req.query.departmentId)
  const rawDepartmentId = req.query.departmentId;
console.log("rawDepartmentId",rawDepartmentId)
  let departmentId: string | undefined;

  if (rawDepartmentId !== undefined) {
    if (
      typeof rawDepartmentId !== "string" ||
      !Types.ObjectId.isValid(rawDepartmentId)
    ) {
      sendError(
        res,
        MESSAGES.DEPARTMENT_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    departmentId = rawDepartmentId;
  }

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
      MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
    return;
  }

  if (!Number.isInteger(page) || page < 1) {
    sendError(
      res,
      "Page must be a positive integer",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    sendError(
      res,
      "Limit must be between 1 and 100",
      HttpStatusCode.BAD_REQUEST,
    );
    return;
  }

  const useCases =
    await this._categoryUseCaseFactory.createForAccount(accountId);

  if (!useCases) {
    sendError(
      res,
      MESSAGES.COMPANY_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
    return;
  }

  const result = await useCases.getAllCategories.execute(
    departmentId,
    page,
    limit,
  );

  sendSuccess(
    res,
    MESSAGES.CATEGORIES_FETCHED,
    result,
    HttpStatusCode.OK,
  );
}

  async updateCategory(
    req: Request,
    res: Response,
  ): Promise<void> {
    const accountId = req.user?.accountId;
    const { categoryId } = req.params;
    const { name, description } = req.body ?? {};

    if (typeof accountId !== "string" || !accountId) {
      sendError(
        res,
        MESSAGES.AUTHENTICATED_ID_MISING,
        HttpStatusCode.UNAUTHORIZED,
      );
      return;
    }

    if (
      typeof categoryId !== "string" ||
      !Types.ObjectId.isValid(categoryId)
    ) {
      sendError(
        res,
        MESSAGES.CATEGORY_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    if (
      typeof name !== "string" ||
      (description != null && typeof description !== "string")
    ) {
      sendError(
        res,
        "Category name and a valid description are required",
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    const useCases =
      await this._categoryUseCaseFactory.createForAccount(accountId);

    if (!useCases) {
      sendError(
        res,
        MESSAGES.COMPANY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
      return;
    }

    const category = await useCases.updateCategory.execute(
      categoryId,
      { name, description: description ?? null },
    );

    sendSuccess(
      res,
      MESSAGES.CATEGORY_UPDATED,
      category,
      HttpStatusCode.OK,
    );
  }

  async updateCategoryStatus(
    req: Request,
    res: Response,
  ): Promise<void> {
    const accountId = req.user?.accountId;
    const { categoryId } = req.params;
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
      typeof categoryId !== "string" ||
      !Types.ObjectId.isValid(categoryId)
    ) {
      sendError(
        res,
        MESSAGES.CATEGORY_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    if (
      status !== CategoryStatus.ACTIVE &&
      status !== CategoryStatus.INACTIVE
    ) {
      sendError(
        res,
        "Status must be ACTIVE or INACTIVE",
        HttpStatusCode.BAD_REQUEST,
      );
      return;
    }

    const useCases =
      await this._categoryUseCaseFactory.createForAccount(accountId);

    if (!useCases) {
      sendError(
        res,
        MESSAGES.COMPANY_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
      return;
    }

    const category =
      await useCases.updateCategoryStatus.execute(categoryId, status);

    sendSuccess(
      res,
      MESSAGES.CATEGORY_STATUS_UPDATED,
      category,
      HttpStatusCode.OK,
    );
  }
}