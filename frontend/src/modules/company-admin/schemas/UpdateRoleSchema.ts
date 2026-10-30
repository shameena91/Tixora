import { z } from "zod";

export const updateRoleSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Role name must contain at least 2 characters")
      .max(100, "Role name cannot exceed 100 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    permissions: z
      .array(z.string())
      .optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.description !== undefined ||
      data.permissions !== undefined,
    {
      message: "At least one field must be updated",
    },
  );