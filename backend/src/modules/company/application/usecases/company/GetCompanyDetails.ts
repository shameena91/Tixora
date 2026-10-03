import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ISubscriptionPlanRepository } from "../../../../subScriptionPlans/domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionRepository } from "../../../../subScriptionPlans/domain/repositories/ISubscriptionRepository";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanyDetails } from "../../abstraction/IgetCompanyDetails";
import { CompanyDetailsResponse } from "../../dto/GetCompanyDto";
import { IFileStoragePort } from "../../ports/IFileStoragePort";

export class GetCompanyDetails implements IGetCompanyDetails {
  constructor(
    private readonly _companyrepository: ICompanyRepository,
    private readonly _s3Service: IFileStoragePort,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionplanRepo: ISubscriptionPlanRepository,
    private readonly _accountRepository:IAccountRepository
  ) {}

  async execute(companyId: string): Promise<CompanyDetailsResponse> {
    const company = await this._companyrepository.findById(companyId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }
const account =
    await this._accountRepository.findById(
      company.accountId
    );
    const subscription =
      await this._subscriptionRepository.findByCompanyId(companyId);

    let subscriptionName: string | null = null;

    if (subscription?.planId) {

      const subscriptionPlan =
        await this._subscriptionplanRepo.findById(subscription.planId);

      subscriptionName = subscriptionPlan?.name ?? null;
    }

    const logoUrl = company.logo
      ? await this._s3Service.getSignedUrl(company.logo)
      : null;

    return {
      id: company.id,
      companyName: company.companyName,
      registrationNumber: company.registrationNumber,
      companyEmail: company.companyEmail,
      phone: company.phone,
      yearEstablished: company.yearEstablished,
      companyType: company.companyType,
      numberOfEmployees: company.numberOfEmployees,
      website: company.website,
      logo: logoUrl,
      description: company.description,
      location:company.location,
      subscription:{
        subscriptionName:subscriptionName,
        billingCycle:subscription?.billingCycle??null,
        status:subscription?.status??null
      },
      status:company.status,
      admin:{
 name: account
      ? `${account.firstName} ${account.lastName}`
      : "Unknown",
    email: account?.email ?? "Unknown",
      }
    };
  }
}