import { z } from "zod";

import { CompanyDocumentType } from "../../domain/value-objects/CompanyDocuments";

export const createCompanyDocumentChangeSchema = z.object({
  documentType: z.enum(CompanyDocumentType),

  reason: z
    .string()
    .trim()
    .max(500, "Reason must not exceed 500 characters")
    .optional(),
});

export const companyDocumentFileSchema = z.object({
  buffer: z.instanceof(Buffer).refine(
    (buffer) => buffer.length > 0,
    "Document file is required",
  ),

  originalname: z
    .string()
    .trim()
    .min(1, "File name is required"),

  mimetype: z.enum(
    ["application/pdf", "image/png", "image/jpeg"],
    {
      error: "Only PDF, PNG and JPEG files are allowed",
    },
  ),

  size: z
    .number()
    .positive("Document file must not be empty")
    .max(5 * 1024 * 1024, "Maximum file size is 5 MB"),
});