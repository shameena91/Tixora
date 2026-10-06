import { CompanyLocation } from "../value-objects/CompanyLocation";
import {
  CompanyType,
  EmployeeCountRange,
 
} from "./CompanyRequest";

export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class Company {
  constructor(
    public readonly id: string,

    public readonly accountId: string,

    public companyName: string,
    public registrationNumber: string,
    public companyEmail: string,
    public phone: string,

    public yearEstablished: number | null,

    public companyType: CompanyType,
    public numberOfEmployees: EmployeeCountRange,

    public website: string | null,
    public logo: string | null,
    public description: string | null,

    public location: CompanyLocation | null,

    public status: CompanyStatus,

    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}