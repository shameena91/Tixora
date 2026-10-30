import { z } from "zod";

import { RoleStatus } from "../../domain/entities/Role";

export const updateRoleStatusSchema = z.object({
  roleStatus: z.enum(RoleStatus),
});

