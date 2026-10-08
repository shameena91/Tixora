import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanyDetails } from "../../abstraction/company/IgetCompanyDetails";
import { IGetMyCompanyDetails } from "../../abstraction/company/IGetMyCompanyDetails";
import { CompanyDetailsResponse } from "../../dto/GetCompanyDto";

export class GetMyCompanyDetails implements IGetMyCompanyDetails{
    constructor(
        private _companyRepository:ICompanyRepository,
        private readonly _getCompanydetails:IGetCompanyDetails
    ){}

    async execute(accountId:string):Promise<CompanyDetailsResponse>
    {
const company=await this._companyRepository.findByAccountId(accountId)
    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }
return await this._getCompanydetails.execute(company.id)
    }
}