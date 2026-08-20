import { z } from "zod";
import {
  CompanyType,
  EmployeeCountRange,
} from "../../domain/entities/CompanyRequest";

export const updateCompanyRequestSchema = z.object({
  companyName: z.string().trim().min(2).max(100).optional(),

  registrationNumber: z.string().trim().optional(),

  companyEmail: z.email().optional(),

  phone: z.string().trim().optional(),

  yearEstablished: z.number().nullable().optional(),

  companyType: z.enum(CompanyType).optional(),

  numberOfEmployees: z
    .enum(EmployeeCountRange)
    .optional(),

  website: z.url().nullable().optional(),

  logo: z.string().nullable().optional(),

  description: z.string().nullable().optional(),

  location: z.object({
    address: z.string().trim().min(1),
    city: z.string().trim().min(1),
    state: z.string().trim().min(1),
    country: z.string().trim().min(1),
    postalCode: z.string().trim().min(1),
  }).optional(),

  documents: z.array(z.object({
      type: z.string(),
      url: z.string(),
      status: z.string(),
    })).optional(),
});

export type UpdateCompanyRequestDto =
  z.infer<typeof updateCompanyRequestSchema>;