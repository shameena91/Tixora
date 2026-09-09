import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { HttpStatusCode } from "../../shared/constants/httpStattusCode.js";
import { AppErrors } from "../../shared/errors/AppErrors.js";

import { z, ZodError } from "zod";
import { errorStatusMap } from "../../application/errorStatusMap.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "File size should not exceed 5 MB",
      });
      return;
    }

    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });

    return;
  }

  if (error instanceof ZodError) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: z.treeifyError(error),
    });

    return;
  }
  if (error instanceof AppErrors) {
    const statusCode =
      typeof error.errorCode === "number"
        ? error.errorCode
        : (errorStatusMap[error.errorCode] ??
          HttpStatusCode.INTERNAL_SERVER_ERROR);

    res.status(statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server errorttt",
  });
};
