import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";

export interface CompanyRequestDetails {
  id: string;

  company: {
    companyName: string;
    registrationNumber: string;
    companyEmail: string;
    phone: string;
    yearEstablished: number | null;
    companyType: string;
    numberOfEmployees: string;
    website: string | null;
    logo: string | null;
    description: string | null;
  };

  admin: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };

  status: CompanyRequestStatus;

  location: unknown;
  documents: unknown[];

  createdAt: Date;
  updatedAt: Date;
}