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
  [ErrorCode.COMPY_NOT_FOUND]: HttpStatusCode.NOT_FOUND,
  [ErrorCode.SUBSCRIPTION_PLAN_NOT_ACTIVE]:HttpStatusCode.CONFLICT,
  [ErrorCode.INVALID_PAYMENT_SIGNATURE]:HttpStatusCode.BAD_REQUEST,
  [ErrorCode.PAYMENT_NOT_FOUND]:HttpStatusCode.NOT_FOUND,
  [ErrorCode.COMPANY_ADMIN_NOT_FOUND]:HttpStatusCode.NOT_FOUND,
  [ErrorCode.SUBSCRIPTION_PLAN_ALREADY_EXISTS]:HttpStatusCode.CONFLICT,
  [ErrorCode.DEPARTMENT_CODE_ALREADY_EXISTS]: HttpStatusCode.CONFLICT,
  [ErrorCode.DEPARTMENT_ALREADY_EXISTS]:HttpStatusCode.CONFLICT,

  [ErrorCode.DEPARTMENT_NOT_FOUND]:HttpStatusCode.NOT_FOUND,
  [ErrorCode.INVALID_INPUT]:HttpStatusCode.CONFLICT
};
