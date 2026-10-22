import type { Response } from "express";

import { sendError } from "../response/ResponseHelper";
import { MESSAGES } from "../../shared/constants/messages";
import { HttpStatusCode } from "../../shared/constants/httpStattusCode";

export async function getUseCasesForAccount<T>(
  accountId: string,
  factory: {
    createForAccount(accountId: string): Promise<T | null>;
  },
  res: Response,
): Promise<T | null> {
  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
      MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );

    return null;
  }


  
  const useCases = await factory.createForAccount(accountId);

  if (!useCases) {
    sendError(
      res,
      MESSAGES.COMPANY_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );

    return null;
  }

  return useCases;
}