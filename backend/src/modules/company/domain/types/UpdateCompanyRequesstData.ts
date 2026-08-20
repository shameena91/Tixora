import { CompanyType, EmployeeCountRange } from "../entities/CompanyRequest";


export interface UpdateCompanyRequestData {
  companyName?: string;
  registrationNumber?: string;
  companyEmail?: string;
  phone?: string;
  yearEstablished?: number | null;
  companyType?: CompanyType;
  numberOfEmployees?: EmployeeCountRange;
  website?: string | null;
  logo?: string | null;
  description?: string | null;

  location?: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  documents?: {
    type: string;
    url: string;
    status: string;
  }[];
}