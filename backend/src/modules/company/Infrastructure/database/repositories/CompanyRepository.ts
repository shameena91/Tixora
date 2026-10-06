// import { QueryFilter } from "mongoose";
// import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";
// import {
//   CompanyCreateData,
//   CompanyMapper,
// } from "../../../application/mappers/CompanyMapper";
// import { Company, CompanyStatus } from "../../../domain/entities/Company";
// import { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";

// import { CompanyDocument, CompanyModel } from "../models/CompanyModel";
// import { CompanyDetailsResponse } from "../../../application/dto/GetCompanyDto";
// import { PaginatedResult } from "../../../../../shared/repository/IBaseRepository";

// export class CompanyRepository implements ICompanyRepository {
//   constructor(
//     private readonly baseRepository: BaseRepository<
//       CompanyDocument,
//       CompanyCreateData
//     >,
//   ) {}

//   async create(data: CompanyCreateData): Promise<Company> {
//     const companyDocument = await this.baseRepository.create(data);

//     return CompanyMapper.toDomain(companyDocument);
//   }

//   async findById(id: string): Promise<Company | null> {
//     const document = await this.baseRepository.findById(id);

//     if (!document) {
//       return null;
//     }

//     return CompanyMapper.toDomain(document);
//   }

//   async findAll(search?: string): Promise<Company[]> {
//     const filter: QueryFilter<CompanyDocument> = search
//       ? {
//           $or: [
//             {
//               companyName: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//             {
//               companyEmail: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//           ],
//         }
//       : {};

//     const documents = await this.baseRepository.findAll(filter, {
//       createdAt: -1,
//     });

//     return documents.map((document) => CompanyMapper.toDomain(document));
//   }

//   async findByAccountId(accountId: string): Promise<Company | null> {
//     const document = await CompanyModel.findOne({
//       accountId,
//     })
//       .lean<CompanyDocument>()
//       .exec();

//     if (!document) {
//       return null;
//     }

//     return CompanyMapper.toDomain(document);
//   }

//   async updateStatus(
//     companyId: string,
//     status: CompanyStatus,
//   ): Promise<Company> {
//     const companyDocument = await this.baseRepository.update(
//       { _id: companyId },
//       {
//         status,
//         updatedAt: new Date(),
//       },
//     );

//     if (!companyDocument) {
//       throw new Error("Company not found");
//     }

//     return CompanyMapper.toDomain(companyDocument);
//   }
//   async findAllPaginated(
//   search: string | undefined,
//   page: number,
//   limit: number,
// ): Promise<PaginatedResult<Company>> {
//   const filter: QueryFilter<CompanyDocument> =
//     search
//       ? {
//           $or: [
//             {
//               companyName: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//             {
//               companyEmail: {
//                 $regex: search,
//                 $options: "i",
//               },
//             },
//           ],
//         }
//       : {};

//   const result =
//     await this.baseRepository.findAllPaginated(
//       filter,
//       page,
//       limit,
//       {
//         createdAt: -1,
//       },
//     );

//   return {
//     data: result.data.map((document) =>
//       CompanyMapper.toDomain(document),
//     ),
//     total: result.total,
//     page: result.page,
//     limit: result.limit,
//     totalPages: result.totalPages,
//   };
// }
// }



import { QueryFilter } from "mongoose";

import { BaseRepository } from "../../../../../infrastructure/repositories/Baserepository";

import {
  CompanyCreateData,
  CompanyMapper,
} from "../../../application/mappers/CompanyMapper";

import {
  Company,
  CompanyStatus,
} from "../../../domain/entities/Company";

import {
  ICompanyRepository,
} from "../../../domain/repositories/ICompanyRepository";

import {
  CompanyDocument,
  CompanyModel,
} from "../models/CompanyModel";

import {
  PaginatedResult,
} from "../../../../../shared/repository/IBaseRepository";

export class CompanyRepository
  implements ICompanyRepository
{
  constructor(
    private readonly baseRepository: BaseRepository<
      CompanyDocument,
      CompanyCreateData
    >,
  ) {}

  // -------------------------
  // Common CRUD
  // -------------------------

  async create(
    data: CompanyCreateData,
  ): Promise<Company> {
    const document =
      await this.baseRepository.create(data);

    return CompanyMapper.toDomain(document);
  }

  async findById(
    id: string,
  ): Promise<Company | null> {
    const document =
      await this.baseRepository.findById(id);

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  async findOne(
    filter: Partial<Company>,
  ): Promise<Company | null> {
    const document =
      await this.baseRepository.findOne(
        filter as Partial<CompanyDocument>,
      );

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  async findAll(
    filter?: Partial<Company>,
    sort?: Record<string, 1 | -1>,
  ): Promise<Company[]> {
    const documents =
      await this.baseRepository.findAll(
        filter as Partial<CompanyDocument>,
        sort,
      );

    return documents.map(
      (document) =>
        CompanyMapper.toDomain(document),
    );
  }

  async update(
    filter: Partial<Company>,
    data: Partial<Company>,
  ): Promise<Company | null> {
    const document =
      await this.baseRepository.update(
        filter as Partial<CompanyDocument>,
        data as Partial<CompanyDocument>,
      );

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  // -------------------------
  // Company-specific methods
  // -------------------------

  async findAllBySearch(
    search?: string,
  ): Promise<Company[]> {
    const filter: QueryFilter<CompanyDocument> =
      search
        ? {
            $or: [
              {
                companyName: {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                companyEmail: {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          }
        : {};

    const documents =
      await CompanyModel.find(filter)
        .sort({ createdAt: -1 })
        .lean<CompanyDocument[]>()
        .exec();

    return documents.map(
      (document) =>
        CompanyMapper.toDomain(document),
    );
  }

  async findByAccountId(
    accountId: string,
  ): Promise<Company | null> {
    const document =
      await CompanyModel.findOne({
        accountId,
      })
        .lean<CompanyDocument>()
        .exec();

    if (!document) {
      return null;
    }

    return CompanyMapper.toDomain(document);
  }

  async updateStatus(
    companyId: string,
    status: CompanyStatus,
  ): Promise<Company> {
    const document =
      await CompanyModel.findByIdAndUpdate(
        companyId,
        {
          status,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      )
        .lean<CompanyDocument>()
        .exec();

    if (!document) {
      throw new Error("Company not found");
    }

    return CompanyMapper.toDomain(document);
  }

  async findAllPaginated(
    search: string | undefined,
    page: number,
    limit: number,
  ): Promise<PaginatedResult<Company>> {
    const filter: QueryFilter<CompanyDocument> =
      search
        ? {
            $or: [
              {
                companyName: {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                companyEmail: {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          }
        : {};

    const skip =
      (page - 1) * limit;

    const [
      documents,
      total,
    ] = await Promise.all([
      CompanyModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<CompanyDocument[]>()
        .exec(),

      CompanyModel.countDocuments(
        filter,
      ).exec(),
    ]);

    return {
      data: documents.map(
        (document) =>
          CompanyMapper.toDomain(document),
      ),
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit,
      ),
    };
  }
}