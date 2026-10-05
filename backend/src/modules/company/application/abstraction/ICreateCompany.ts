import {
  CreateCompanyRequestDto,
  CreateCompanyResponseDto,
} from "../dto/CreateCompanyDto";

export interface ICreateCompany {
  execute(data: CreateCompanyRequestDto): Promise<CreateCompanyResponseDto>;
}
