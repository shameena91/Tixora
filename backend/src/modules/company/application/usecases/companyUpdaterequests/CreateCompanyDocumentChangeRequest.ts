import { generateCompanyChangeRequestId } from "../../../../../shared/utills/generateCompanyChangeRequestId";

import {
  CompanyDocumentChange,
  CompanyDocumentChangeStatus,
} from "../../../domain/entities/CompanyDocumentChange";

import type { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository";
import type { ICompanyRequestRepository } from "../../../domain/repositories/ICompanyRequestRepository";
import type { ICompanyChangeRequestRepository } from "../../../domain/repositories/ICompanyChangeRequestRepository";
import type { IFileStoragePort } from "../../ports/IFileStoragePort";

import type {
  CreateCompanyDocumentChangeRequestDTO,
  CreateCompanyDocumentChangeRequestResponseDTO,
  DocumentUploadFile,
} from "../../dto/CreateCompanyDocumentChangeDTO";
import { ICreateCompanyDocumentChangeRequest } from "../../abstraction/companyUpdaterequests/ICreateCompanyDocumentChangeRequest";


export class CreateCompanyDocumentChangeRequest implements ICreateCompanyDocumentChangeRequest{
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _companyRequestRepository: ICompanyRequestRepository,
    private readonly _companyChangeRequestRepository: ICompanyChangeRequestRepository,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    accountId: string,
    dto: CreateCompanyDocumentChangeRequestDTO,
    file: DocumentUploadFile,
   
  ): Promise<CreateCompanyDocumentChangeRequestResponseDTO> {
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new Error("Company not found for this account");
    }

    const companyRequest =
      await this._companyRequestRepository.findByAccountId(accountId);

    if (!companyRequest) {
      throw new Error("Company registration request not found");
    }

 const existingDocument = companyRequest.documents.find(
  (document) => document.documentType === dto.documentType,
);

const oldDocumentKey = existingDocument?.fileKey ?? null;

if (!oldDocumentKey) {
  throw new Error(
    "The current document was not found for replacement",
  );
}

if (!oldDocumentKey) {
  throw new Error(
    "The current document was not found for replacement",
  );
}

    if (!oldDocumentKey) {
      throw new Error(
        "The current document was not found for replacement",
      );
    }

    const uploadedFile = await this._fileStorage.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      `company-change-requests/${company.id}`,
    );
console.log("date.reason",dto.reason)
    try {
      const now = new Date();

      const documentChange = new CompanyDocumentChange(
        null,
        await generateCompanyChangeRequestId(),
        company.id,
        accountId,
        dto.documentType,
        oldDocumentKey,
        uploadedFile.key,
        dto.reason?.trim() || null,
        CompanyDocumentChangeStatus.PENDING,
        now,
        null,
        null,
        null,
        now,
        now,
      );

      const savedChange =
        await this._companyChangeRequestRepository.createDocumentChange(
          documentChange,
        );

      return {
        requestId: savedChange.requestId,
        companyId: savedChange.companyId,
        accountId: savedChange.accountId,
        changeType: "DOCUMENT",
        documentType: savedChange.documentType,
        status: savedChange.status,
        submittedAt: savedChange.submittedAt,
      };
    } catch (error) {
      try {
        await this._fileStorage.delete(uploadedFile.key);
      } catch (deleteError) {
              console.error("Failed to cleanup S3 file:", deleteError);
            }
      

      throw error;
    }
  }
}