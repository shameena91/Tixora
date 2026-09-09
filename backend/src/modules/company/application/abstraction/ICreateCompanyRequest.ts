import { CompanyRequest } from "../../domain/entities/CompanyRequest";
import { CreateCompanyRequestDto } from "../Validators/CreateCompanyRequestSchema";

export interface ICreateCompanyRequest{
     execute(
    data: CreateCompanyRequestDto
  ): Promise<CompanyRequest>;
}