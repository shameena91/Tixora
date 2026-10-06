import { randomUUID } from "crypto";
import { HttpStatusCode } from "../../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { generateRequestId } from "../../../../../shared/utills/generateRequestId";
import { RegistrationStep } from "../../../../auth/domain/entities/Account";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import {
  CompanyRequest,
  CompanyRequestStatus,
  RegistrationType,
} from "../../../domain/entities/CompanyRequest";
import { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import { ICreateCompanyRequest } from "../../abstraction/company-requests/ICreateCompanyRequest";
import { CreateCompanyRequestDto } from "../../dto/CreateCompanyRequestDto";

export class CreateCompanyRequest implements ICreateCompanyRequest {
  constructor(
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(data: CreateCompanyRequestDto): Promise<CompanyRequest> {
    const existingCompanyRequest =
      await this._companyRequestRepository.findByPhone(data.phone);

    if (existingCompanyRequest) {
      throw new AppErrors(
        MESSAGES.PHONE_ALREADY_EXISTS,
        HttpStatusCode.CONFLICT,
      );
    }

    const existingCompanyEmail =
      await this._companyRequestRepository.findByEmail(data.companyEmail);

    if (existingCompanyEmail) {
      throw new AppErrors(
        MESSAGES.EMAIL_ALREADY_VERIFIED,
        HttpStatusCode.CONFLICT,
      );
    }

    const logoKey = data.logo || null;

    const requestId = await generateRequestId();

    const companyRequest = new CompanyRequest(
      randomUUID(),
      requestId,
      RegistrationType.REGISTRATION,

      data.accountId,

      data.companyName,
      data.registrationNumber,
      data.companyEmail,
      data.phone,
      data.yearEstablished,

      data.companyType,
      data.numberOfEmployees,

      CompanyRequestStatus.PENDING,

      data.website,
      logoKey,
      data.description,

      null,
      [],

      new Date(),

      null,
      null,
      null,
      null,

      new Date(),
      new Date(),
    );

    const createdCompanyRequest =
      await this._companyRequestRepository.create(companyRequest);

    await this._accountRepository.updateRegistrationStep(
      data.accountId,
      RegistrationStep.COMPANY_DETAILS,
    );

    return createdCompanyRequest;
  }
}
