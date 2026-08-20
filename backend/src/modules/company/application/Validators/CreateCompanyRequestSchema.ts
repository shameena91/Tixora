import { z } from "zod";
import {
  CompanyType,
  EmployeeCountRange,
} from "../../domain/entities/CompanyRequest";
import { CompanyDocumentType } from "../../domain/Value-objects/CompanyDocuments";

export const createCompanyRequestSchema = z.object({
  accountId: z.string(),

  companyName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  registrationNumber: z
    .string()
    .trim()
    .min(1),

  companyEmail: z.email(),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/),

  yearEstablished: z
    .number()
    .nullable(),

  companyType: z.enum(CompanyType),

  numberOfEmployees: z.enum(EmployeeCountRange),

  website: z
    .url()
    .nullable(),

  logo: z
    .string()
    .nullable(),

  description: z
    .string()
    .nullable(),

  location: z.object({
    address: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
  }),

    documents: z.array(
    z.object({
      documentType: z.enum(CompanyDocumentType),
      fileName: z.string().trim().min(1),
      fileUrl: z.string().trim().min(1),
    })
)
 
});

export type CreateCompanyRequestDto =
  z.infer<typeof createCompanyRequestSchema>;