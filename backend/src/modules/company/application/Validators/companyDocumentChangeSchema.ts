import { z } from "zod";

export const companyDocumentChangeSchema = z.object({
  file: z
    .instanceof(File, {
      message: "Please select a document",
    })
    .refine(
      (file) =>
        [
          "application/pdf",
          "image/png",
          "image/jpeg",
        ].includes(file.type),
      "Only PDF, PNG and JPEG files are allowed",
    ),

  reason: z
    .string()
    .trim()
    .max(500, "Reason must not exceed 500 characters")
    .optional(),
});