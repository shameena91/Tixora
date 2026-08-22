import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../shared/errors/AppErrors.js";
import multer from "multer";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
    if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({
        success: false,
        message: "File size should not exceed 5 MB",
      });

      return;
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });

    return;
  }
  if (error instanceof AppErrors) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};