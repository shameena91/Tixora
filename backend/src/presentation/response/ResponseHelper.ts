import { Response } from "express";
import { ApiErrorResponse, ApiResponse } from "./ApiResponse";

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number,
  error?: unknown,
): Response => {
  const response: ApiErrorResponse = {
    success: false,
    message,
    error,
  };

  return res.status(statusCode).json(response);
};
