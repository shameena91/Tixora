import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanies } from "../../abstraction/IGetCompanies";
import { GetCompanyListResponseDto } from "../../dto/GetCompanyListDto";
import { IFileStoragePort } from "../../ports/IFileStoragePort";

export class GetCompanies implements IGetCompanies {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _s3Service: IFileStoragePort,
  ) {}

  async execute(
    search?: string,
  ): Promise<GetCompanyListResponseDto[]> {
    const companies =
      await this._companyRepository.findAll(search);

    return await Promise.all(
      companies.map(async (company) => {

        const logoUrl = company.logo
          ? await this._s3Service.getSignedUrl(company.logo)
          : null;

        return {
          id: company.id,
          logo: logoUrl,
          companyName: company.companyName,
          companyEmail: company.companyEmail,
          status: company.status,
          createdAt: company.createdAt,
        };
      }),
    );
  }
}