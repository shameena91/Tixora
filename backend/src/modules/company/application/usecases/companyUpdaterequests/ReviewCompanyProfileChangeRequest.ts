import {
  CompanyProfileChangeStatus,
  CompanyProfileField,
  CompanyProfileFieldChangeStatus,
} from "../../../domain/entities/CompanyProfileChange";

import type { Company } from "../../../domain/entities/Company";

import { CompanyLocation } from "../../../domain/value-objects/CompanyLocation";

import {
  CompanyType,
  EmployeeCountRange,
} from "../../../domain/entities/CompanyRequest";

import type { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import type { ICompanyChangeRequestRepository } from "../../../domain/repositories/ICompanyChangeRequestRepository";

import type {
  ReviewCompanyProfileChangeRequestDTO,
  ReviewCompanyProfileChangeResponseDTO,
} from "../../dto/ReviewCompanyProfileChangeDTO";

import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";

import { IReviewCompanyProfileChangeRequest } from "../../abstraction/companyUpdaterequests/IReviewCompanyProfileChangeRequest";

export class ReviewCompanyProfileChangeRequest
  implements IReviewCompanyProfileChangeRequest
{
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
  ) {}

  async execute(
    requestId: string,
    reviewerId: string,
    dto: ReviewCompanyProfileChangeRequestDTO,
  ): Promise<ReviewCompanyProfileChangeResponseDTO> {
    const request =
      await this._companyChangeRequestRepository.findByRequestId(
        requestId,
      );
console.log("request",request)
    if (!request) {
      throw new AppErrors(
        MESSAGES.COMPANY_PROFILE_CHANGE_REQUEST_NOT_FOUND,
        ErrorCode.COMPANY_PROFILE_CHANGE_REQUEST_NOT_FOUND,
      );
    }

    if (request.status !== CompanyProfileChangeStatus.PENDING) {
      throw new AppErrors(
        MESSAGES.COMPANY_PROFILE_CHANGE_REQUEST_ALREADY_REVIEWED,
        ErrorCode.COMPANY_PROFILE_CHANGE_REQUEST_ALREADY_REVIEWED,
      );
    }

    const change = request.changes.find(
      (item) => item.field === dto.field,
    );

    if (!change) {
      throw new AppErrors(
        MESSAGES.COMPANY_PROFILE_FIELD_CHANGE_NOT_FOUND,
        ErrorCode.COMPANY_PROFILE_FIELD_CHANGE_NOT_FOUND,
      );
    }

    if (change.status !== CompanyProfileFieldChangeStatus.PENDING) {
      throw new AppErrors(
        MESSAGES.COMPANY_PROFILE_FIELD_ALREADY_REVIEWED,
        ErrorCode.COMPANY_PROFILE_FIELD_ALREADY_REVIEWED,
      );
    }

    const reviewedAt = new Date();

    if (dto.decision === CompanyProfileFieldChangeStatus.APPROVED) {
      const company = await this._companyRepository.findById(
        request.companyId,
      );

      if (!company) {
        throw new AppErrors(
          MESSAGES.COMPANY_NOT_FOUND,
          ErrorCode.COMPANY_NOT_FOUND,
        );
      }

      this.applyApprovedChange(
        company,
        change.field,
        change.newValue,
      );

      company.updatedAt = reviewedAt;

      const updatedCompany = await this._companyRepository.update(
  { accountId: company.accountId },
  company,
);

if (!updatedCompany) {
  throw new AppErrors(
    MESSAGES.COMPANY_NOT_FOUND,
    ErrorCode.COMPANY_NOT_FOUND,
  );
}
    }

    request.reviewField(
      dto.field,
      dto.decision,
      reviewerId,
      dto.remarks?.trim() || null,
      reviewedAt,
    );

    const updatedRequest =
      await this._companyChangeRequestRepository.updateProfileChange(
        request,
      );

    if (!updatedRequest) {
      throw new AppErrors(
        MESSAGES.COMPANY_PROFILE_CHANGE_REQUEST_UPDATE_FAILED,
        ErrorCode.COMPANY_PROFILE_CHANGE_REQUEST_UPDATE_FAILED,
      );
    }

    return {
      requestId: updatedRequest.requestId,
      companyId: updatedRequest.companyId,
      accountId: updatedRequest.accountId,
      status: updatedRequest.status,

      changes: updatedRequest.changes.map((item) => ({
        field: item.field,
        oldValue: item.oldValue,
        newValue: item.newValue,
        reason: item.reason,
        status: item.status,
        reviewRemarks: item.reviewRemarks,
      })),

      reviewedBy: updatedRequest.reviewedBy,
      reviewedAt: updatedRequest.reviewedAt,
      reviewRemarks: updatedRequest.reviewRemarks,
      submittedAt: updatedRequest.submittedAt,
    };
  }

  private applyApprovedChange(
    company: Company,
    field: CompanyProfileField,
    value: string,
  ): void {
    switch (field) {
      case CompanyProfileField.COMPANY_NAME:
        company.companyName = value;
        break;

      case CompanyProfileField.REGISTRATION_NUMBER:
        company.registrationNumber = value;
        break;

      case CompanyProfileField.COMPANY_TYPE:
        if (!Object.values(CompanyType).includes(value as CompanyType)) {
          throw new Error("Invalid company type");
        }

        company.companyType = value as CompanyType;
        break;

      case CompanyProfileField.EMPLOYEE_RANGE:
        if (
          !Object.values(EmployeeCountRange).includes(
            value as EmployeeCountRange,
          )
        ) {
          throw new Error("Invalid employee range");
        }

        company.numberOfEmployees =
          value as EmployeeCountRange;
        break;

      case CompanyProfileField.ADDRESS:
      case CompanyProfileField.CITY:
      case CompanyProfileField.STATE:
      case CompanyProfileField.COUNTRY:
      case CompanyProfileField.POSTAL_CODE: {
        const location = company.location;

        company.location = new CompanyLocation(
          field === CompanyProfileField.ADDRESS
            ? value
            : location?.address ?? "",
          field === CompanyProfileField.CITY
            ? value
            : location?.city ?? "",
          field === CompanyProfileField.STATE
            ? value
            : location?.state ?? "",
          field === CompanyProfileField.COUNTRY
            ? value
            : location?.country ?? "",
          field === CompanyProfileField.POSTAL_CODE
            ? value
            : location?.postalCode ?? "",
        );

        break;
      }
    }
  }
}