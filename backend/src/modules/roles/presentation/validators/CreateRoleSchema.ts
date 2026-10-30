import { z } from "zod";
import { PermissionCode, PERMISSIONS } from "../../../../shared/constants/permissionCatalog";



const permissionValues = Object.values(PERMISSIONS) as [
  PermissionCode,
  ...PermissionCode[],
];

export const createRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Role name must contain at least 2 characters")
    .max(100, "Role name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .default(""),

  permissions: z
    .array(z.enum(permissionValues))
    .default([]),
});
