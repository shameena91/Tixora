import {  GetCompanyChangeRequestsDTO, GetCompanyChangeRequestsResponseDTO } from "../../dto/GetAllCompanyChnageRequestDto";

  export interface  IGetCompanyChangeRequests{
     execute(
    filters: GetCompanyChangeRequestsDTO,
  ): Promise<GetCompanyChangeRequestsResponseDTO >

  }