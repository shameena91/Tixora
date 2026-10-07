import { CompanyRequest } from "../../../domain/entities/CompanyRequest";
import { CreateCompanyRequestDto } from "../../dto/CreateCompanyDto";

export interface ICreateCompanyRequest{
     execute(
    data: CreateCompanyRequestDto
  ): Promise<CompanyRequest>;
}