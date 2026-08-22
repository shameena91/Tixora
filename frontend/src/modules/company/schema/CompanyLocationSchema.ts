import { z } from "zod";

export const companyLocationSchema = z.object({
  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(200, "Address is too long"),

  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .max(100, "City name is too long"),

  state: z
    .string()
    .trim()
    .min(1, "State is required")
    .max(100, "State name is too long"),

  country: z
    .string()
    .trim()
    .min(2, "Country is required")
    .max(100, "Country name is too long"),

  postalCode: z
    .string()
    .trim()
    .min(1, "Postal code is required")
    .min(4, "Postal code is required")
    .max(10, "Invalid postal code"),
});