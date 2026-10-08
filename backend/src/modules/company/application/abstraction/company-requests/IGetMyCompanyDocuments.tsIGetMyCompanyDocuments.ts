import { GetMyCompanyDocumentsResponse } from "../../dto/GetMyCompanyDocumentsDto";

export interface IGetMyCompanyDocuments {
  execute(
    accountId: string,
  ): Promise<GetMyCompanyDocumentsResponse>;
}