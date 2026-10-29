import { generateCompanyChangeRequestId } from "../../../../../shared/utills/generateCompanyChangeRequestId";

import { Company } from "../../../domain/entities/Company";

import {
  CompanyProfileChange,
  CompanyProfileChangeStatus,
  CompanyProfileField,
  CompanyProfileFieldChangeStatus,
  type ProfileFieldChange,
} from "../../../domain/entities/CompanyProfileChange";

import { ICompanyChangeRequestRepository } from "../../../domain/repositories/ICompanyChangeRequestRepository";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { ICreateCompanyProfileChangeRequest } from "../../abstraction/companyUpdaterequests/ICreateCompanyProfileChangeRequest";

import {
  CreateCompanyProfileChangeRequestDTO,
  CreateCompanyProfileChangeRequestResponseDTO,
} from "../../dto/CreateCompanyProfileChangeDTO";

export class CreateCompanyProfileChangeRequest implements ICreateCompanyProfileChangeRequest {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
  ) {}

  async execute(
    accountId: string,
    dto: CreateCompanyProfileChangeRequestDTO,
  ): Promise<CreateCompanyProfileChangeRequestResponseDTO> {
  
    if (!dto.profileChanges?.length) {
      throw new Error(
        "At least one profile change is required",
      );
    }

    const fields = dto.profileChanges.map(
      (change) => change.field,
    );

    if (new Set(fields).size !== fields.length) {
      throw new Error(
        "Duplicate profile fields are not allowed",
      );
    }

    for (const change of dto.profileChanges) {
      if (!change.newValue.trim()) {
        throw new Error(
          `New value is required for ${change.field}`,
        );
      }

      if (!change.reason.trim()) {
        throw new Error(
          `Reason is required for ${change.field}`,
        );
      }
    }

 
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new Error(
        "Company not found for this account",
      );
    }

    const now = new Date();

    const changes: ProfileFieldChange[] =
      dto.profileChanges.map((change) => ({
        field: change.field,
        oldValue: this.getCurrentValue(
          company,
          change.field,
        ),
        newValue: change.newValue.trim(),
        reason: change.reason.trim(),
        status: CompanyProfileFieldChangeStatus.PENDING,
        reviewRemarks: null,
      }));
const requestId=await generateCompanyChangeRequestId()

    const profileChange = new CompanyProfileChange(
      null,
     requestId,
      company.id,
      accountId,
      changes,
      CompanyProfileChangeStatus.PENDING,
      now,
      null,
      null,
      null,
      now,
      now,
    );

  
    const savedChange =
      await this._companyChangeRequestRepository
        .createProfileChange(profileChange);

  
    return {
      requestId: savedChange.requestId,
      companyId: savedChange.companyId,
      accountId: savedChange.accountId,
      changeType: "PROFILE",
      status: savedChange.status,
      submittedAt: savedChange.submittedAt,
    };
  }

  private getCurrentValue(
    company: Company,
    field: CompanyProfileField,
  ): string | null {
    switch (field) {
      case CompanyProfileField.COMPANY_NAME:
        return company.companyName ?? null;

      case CompanyProfileField.REGISTRATION_NUMBER:
        return company.registrationNumber ?? null;

      case CompanyProfileField.COMPANY_TYPE:
        return company.companyType == null
          ? null
          : String(company.companyType);

      case CompanyProfileField.EMPLOYEE_RANGE:
        return company.numberOfEmployees == null
          ? null
          : String(company.numberOfEmployees);

      case CompanyProfileField.ADDRESS:
        return company.location?.address ?? null;

      case CompanyProfileField.CITY:
        return company.location?.city ?? null;

      case CompanyProfileField.STATE:
        return company.location?.state ?? null;

      case CompanyProfileField.COUNTRY:
        return company.location?.country ?? null;

      case CompanyProfileField.POSTAL_CODE:
        return company.location?.postalCode ?? null;
    }
  }
}