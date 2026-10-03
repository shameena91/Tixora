import { Company } from "../../domain/entities/Company";

export interface CreateCompanyRequestDto {
  accountId: string;

  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;

  yearEstablished: number | null;

  companyType: Company["companyType"];
  numberOfEmployees: Company["numberOfEmployees"];

  website: string | null;
  logo: string | null;
  description: string | null;

  location: Company["location"];
}


export interface CreateCompanyResponseDto {
  id: string;
  accountId: string;

  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;

  yearEstablished: number | null;

  companyType: Company["companyType"];
  numberOfEmployees: Company["numberOfEmployees"];

  website: string | null;
  logo: string | null;
  description: string | null;

  location: Company["location"];

  status: Company["status"];

  createdAt: Date;
  updatedAt: Date;
}