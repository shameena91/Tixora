import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must have at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters"),

  departmentId: z
    .string()
    .trim()
    .min(1, "Please select a department"),
});

export type CategoryFormData = z.infer<
  typeof categoryFormSchema
>;