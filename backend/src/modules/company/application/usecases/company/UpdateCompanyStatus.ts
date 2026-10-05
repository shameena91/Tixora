import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { CompanyStatus } from "../../../domain/entities/Company";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IUpdateCompanyStatus } from "../../abstraction/IUpdateCompanyStatus";
import { UpdateCompanyStatusResponseDto } from "../../dto/UpdateCompanyStatusResponseDto";

export class UpdateCompanyStatus implements IUpdateCompanyStatus {
  constructor(private readonly _companyRepository: ICompanyRepository) {}

  async execute(
    companyId: string,
    status: CompanyStatus,
  ): Promise<UpdateCompanyStatusResponseDto> {
    const company = await this._companyRepository.findById(companyId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const updatedCompany = await this._companyRepository.updateStatus(
      companyId,
      status,
    );

    return {
      id: updatedCompany.id,
      companyName: updatedCompany.companyName,
      status: updatedCompany.status,
    };
  }
}
