import { z } from "zod";

export const companyRegistrationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name is too long"),

  registrationNumber: z
    .string()
    .trim()
    .min(1, "Registration number is required"),

  companyEmail: z
    .string()
    .trim()
    .min(1, "Company email is required")
    .email("Enter a valid company email"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits"
    ),

  yearEstablished: z
    .string()
    .min(1, "Year established is required"),

  companyType: z
    .string()
    .min(1, "Company type is required"),

  numberOfEmployees: z
    .string()
    .min(1, "Number of employees is required"),

  website: z
    .string()
    .trim()
    .url("Enter a valid website URL")
    .or(z.literal("")),

  logo: z
    .string()
    .optional(),

  description: z
    .string()
    .optional(),
});

export type CompanyRegistrationData =
  z.infer<typeof companyRegistrationSchema>;