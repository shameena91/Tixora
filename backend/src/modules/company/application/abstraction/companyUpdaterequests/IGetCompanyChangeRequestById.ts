
import { GetCompanyChangeRequestByIdResponseDTO } from "../../dto/GetCompanyChangeRequestByIdDTO";

export interface IGetCompanyChangeRequestById {
   execute(
    requestId: string,
  ): Promise<GetCompanyChangeRequestByIdResponseDTO>}