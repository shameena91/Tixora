
import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Department name is required")
    .max(100, "Department name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(1, "Department code is required")
    .max(20, "Department code cannot exceed 20 characters")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Code can contain only letters, numbers, hyphens and underscores",
    ),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateDepartmentFormData = z.infer<
  typeof createDepartmentSchema
>;

