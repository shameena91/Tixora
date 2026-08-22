import { z } from "zod";

export const updateCompanyLocationSchema = z.object({
  address: z.string().trim().min(1, "Address is required"),

  city: z.string().trim().min(1, "City is required"),

  state: z.string().trim().min(1, "State is required"),

  country: z.string().trim().min(1, "Country is required"),

  postalCode: z.string().trim().min(1, "Postal code is required"),
});

export type UpdateCompanyLocationDto =
  z.infer<typeof updateCompanyLocationSchema>;