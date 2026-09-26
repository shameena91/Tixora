import { Types } from "mongoose";

import { Company } from "../../domain/entities/Company";
import { CompanyDocument } from "../../Infrastructure/database/models/CompanyModel";



export interface CompanyCreateData {
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
}

export class CompanyMapper {
  static toDomain(
    document: CompanyDocument
  ): Company {
    return new Company(
      document._id.toString(),

      document.accountId,

      document.companyName,
      document.registrationNumber,
      document.companyEmail,
      document.phone,

      document.yearEstablished,

      document.companyType,
      document.numberOfEmployees,

      document.website,
      document.logo,
      document.description,

      document.location,

      document.status,

      document.createdAt,
      document.updatedAt,
    );
  }

  static toPersistence(
    company: Company
  ): CompanyCreateData {
    return {
      accountId: company.accountId,

      companyName: company.companyName,
      registrationNumber:
        company.registrationNumber,
      companyEmail: company.companyEmail,
      phone: company.phone,

      yearEstablished:
        company.yearEstablished,

      companyType: company.companyType,
      numberOfEmployees:
        company.numberOfEmployees,

      website: company.website,
      logo: company.logo,
      description: company.description,

      location: company.location,

      status: company.status,
    };
  }
}