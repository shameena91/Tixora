
import { MESSAGES } from "../../shared/constants/messages";
import { HttpStatusCode } from "../../shared/constants/httpStattusCode";
import { AppErrors } from "../../shared/errors/AppErrors";

export async function getUseCasesForAccount<T>(
  accountId: string,
  factory: {
    createForAccount(accountId: string): Promise<T | null>;
  },
): Promise<T> {
  if (typeof accountId !== "string" || !accountId) {
    throw new AppErrors(
      MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const useCases = await factory.createForAccount(accountId);

  if (!useCases) {
    throw new AppErrors(
      MESSAGES.COMPANY_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
  }

  return useCases;
}
