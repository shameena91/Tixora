import { z } from "zod";

export const companyChangeRequestSchema = z.object({
  changes: z
    .array(
      z.object({
        field: z.enum([
          "companyName",
          "registrationNumber",
          "companyType",
          "employeeRange",
          "address",
          "city",
          "state",
          "country",
          "postalCode",
        ]),
        newValue: z
          .string()
          .trim()
          .min(1, "New value is required"),
        reason: z
          .string()
          .trim()
          .min(1, "Reason is required"),
      }),
    )
    .min(1, "At least one profile change is required"),
});