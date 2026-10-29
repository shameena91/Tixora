import { CreateCompanyProfileChangeRequestDTO, CreateCompanyProfileChangeRequestResponseDTO } from "../../dto/CreateCompanyProfileChangeDTO";



export interface ICreateCompanyProfileChangeRequest {
  execute(
    accountId: string,
    input: CreateCompanyProfileChangeRequestDTO,
  ): Promise<CreateCompanyProfileChangeRequestResponseDTO>;
}