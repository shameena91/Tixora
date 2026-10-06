import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import { IGetCompanies } from "../../abstraction/company/IGetCompanies";
import { GetCompaniesPaginatedResponseDto } from "../../dto/GetCompanyListDto";
import { IFileStoragePort } from "../../ports/IFileStoragePort";

export class GetCompanies
  implements IGetCompanies
{
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _s3Service: IFileStoragePort,
  ) {}

  async execute(
    search: string | undefined,
    page: number,
    limit: number,
  ): Promise<GetCompaniesPaginatedResponseDto> {
    const result =
      await this._companyRepository.findAllPaginated(
        search,
        page,
        limit,
      );

    const companies =
      await Promise.all(
        result.data.map(async (company) => {
          const logoUrl = company.logo
            ? await this._s3Service.getSignedUrl(
                company.logo,
              )
            : null;

          return {
            id: company.id,
            logo: logoUrl,
            companyName:
              company.companyName,
            companyEmail:
              company.companyEmail,
            status: company.status,
            createdAt: company.createdAt,
          };
        }),
      );

    return {
      data: companies,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}