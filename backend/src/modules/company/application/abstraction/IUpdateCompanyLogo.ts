import { CompanyLogoFile } from "../../domain/types/CompanyDocumentFile";

export interface IUpdateCompanyLogo {
  execute(
   
    logo: CompanyLogoFile,
  ): Promise<string>;
}