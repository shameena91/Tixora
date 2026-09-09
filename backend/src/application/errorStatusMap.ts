import { HttpStatusCode } from "../shared/constants/httpStattusCode";
import { ErrorCode } from "../shared/errors/ErrorCode";

export const errorStatusMap: Record<string, number> = {
  [ErrorCode.ACCOUNT_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  [ErrorCode.COMPANY_REQUEST_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  [ErrorCode.INVALID_CREDENTIALS]: HttpStatusCode.UNAUTHORIZED,
    [ErrorCode.COMPANY_REQUEST_CANNOT_BE_UPDATED]:
    HttpStatusCode.BAD_REQUEST,
    [ErrorCode.COMPANY_REQUEST_ALL_DOCUMENTS_REQUIRED]:
  HttpStatusCode.BAD_REQUEST,
  [ErrorCode.DOCUMENT_FILE_REQUIRED]:
  HttpStatusCode.BAD_REQUEST,
};
