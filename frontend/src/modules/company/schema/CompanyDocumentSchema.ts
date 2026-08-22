import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export const companyDocumentsSchema = z.object({
  registrationCertificate: z
    .instanceof(File, {
      message: "Registration certificate is required",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Registration certificate must be less than 5 MB"
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Only PDF, JPG, JPEG, and PNG files are allowed"
    ),

  taxDocument: z
    .instanceof(File, {
      message: "Tax document is required",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Tax document must be less than 5 MB"
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Only PDF, JPG, JPEG, and PNG files are allowed"
    ),

  businessLicense: z
    .instanceof(File, {
      message: "Business license is required",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Business license must be less than 5 MB"
    )
    .refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      "Only PDF, JPG, JPEG, and PNG files are allowed"
    ),
});