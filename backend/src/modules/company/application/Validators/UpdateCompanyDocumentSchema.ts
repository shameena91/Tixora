import { z } from "zod";
import { CompanyDocumentType } from "../../domain/value-objects/CompanyDocuments";

export const updateCompanyDocumentsSchema = z.object({
  documents: z
    .array(
      z.object({
        documentType: z.enum(CompanyDocumentType),
        fileName: z.string().trim().min(1),
        fileUrl: z.string().trim().min(1),
      })
    )
    .min(1, "At least one document is required"),
});

export type UpdateCompanyDocumentsDto =
  z.infer<typeof updateCompanyDocumentsSchema>;