import { GetCompanyChangeRequestByIdResponseDTO } from "../../dto/GetCompanyChangeRequestByIdDTO";

export interface IGetMyCompanyChangeRequests {
  execute(accountId: string): Promise<GetCompanyChangeRequestByIdResponseDTO[]>;
}