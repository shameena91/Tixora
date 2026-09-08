import { Request, Response } from "express";
import { HttpStatusCode } from "../../shared/constants/httpStattusCode";

export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
    res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
