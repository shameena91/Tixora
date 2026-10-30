import { z } from "zod";
import { PermissionCode, PERMISSIONS } from "../../../../shared/constants/permissionCatalog";



const permissionValues = Object.values(PERMISSIONS) as [
  PermissionCode,
  ...PermissionCode[],
];

export const updateRoleSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    permissions: z
      .array(z.enum(permissionValues))
      .optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.description !== undefined ||
      data.permissions !== undefined,
    {
      message: "At least one field must be provided",
    },
  );

