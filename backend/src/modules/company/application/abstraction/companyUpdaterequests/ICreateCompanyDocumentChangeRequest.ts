import { CreateCompanyDocumentChangeRequestDTO, CreateCompanyDocumentChangeRequestResponseDTO, DocumentUploadFile } from "../../dto/CreateCompanyDocumentChangeDTO";

 export interface ICreateCompanyDocumentChangeRequest{
 execute(
    accountId: string,
    dto: CreateCompanyDocumentChangeRequestDTO,
    file: DocumentUploadFile,
  
  ): Promise<CreateCompanyDocumentChangeRequestResponseDTO> 
 }
 