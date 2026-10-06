import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { IAccountRepository } from "../../../../auth/domain/repositories/IAccountRepository";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanyAdmins } from "../../abstraction/company/IGetCompanyAdmins";
import { GetAdminListDto } from "../../dto/GetAdminListDto";


export class GetCompanyAdmins implements IGetCompanyAdmins {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(companyId: string): Promise<GetAdminListDto> {
    const company = await this._companyRepository.findById(companyId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const admin = await this._accountRepository.findById(company.accountId);

    if (!admin) {
      throw new AppErrors(
        MESSAGES.COMPANY_ADMIN_NOT_FOUND,
        ErrorCode.COMPANY_ADMIN_NOT_FOUND,
      );
    }

    if (admin.role !== "COMPANY_ADMIN") {
      throw new AppErrors(
        MESSAGES.COMPANY_ADMIN_NOT_FOUND,
        ErrorCode.COMPANY_ADMIN_NOT_FOUND,
      );
    }

    return {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      status: admin.status,
      phone: admin.phone,
      email: admin.email,
      designation: admin.designation,
    };
  }
}
