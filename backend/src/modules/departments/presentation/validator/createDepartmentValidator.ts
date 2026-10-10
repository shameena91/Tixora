import { z } from "zod";

export const createDepartmentSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Department code must be at least 2 characters")
    .max(20, "Department code must not exceed 20 characters"),

  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .max(100, "Department name must not exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must not exceed 500 characters")
    .nullable()
    .optional(),
});

export type CreateDepartmentInput = z.infer<
  typeof createDepartmentSchema
>;