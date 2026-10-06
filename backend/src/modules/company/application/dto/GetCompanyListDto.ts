import { Company } from "../../domain/entities/Company";

export interface GetCompanyListResponseDto{

      id: string;
  logo: string | null;
  companyName: string;
  companyEmail: string;
  status: Company["status"];
  createdAt:Date
    
}