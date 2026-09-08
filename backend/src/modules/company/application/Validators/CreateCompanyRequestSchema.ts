import { z } from "zod";
import {
    CompanyType,
    EmployeeCountRange,
} from "../../domain/entities/CompanyRequest";

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
});

export type CreateCompanyRequestDto =
  z.infer<typeof createCompanyRequestSchema>;