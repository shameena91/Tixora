import { z } from "zod";

import {
  SubscriptionPlanName,
} from "../../domain/entities/SubscriptionPlan";

export const createSubscriptionPlanSchema = z.object({
  name: z.enum(SubscriptionPlanName),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description is too long"),

  monthlyPrice: z
    .number()
    .min(0, "Monthly price cannot be negative"),

  yearlyPrice: z
    .number()
    .min(0, "Yearly price cannot be negative"),

  memberLimit: z
    .number()
    .int()
    .positive()
    .nullable(),

  companyAdminLimit: z
    .number()
    .int()
    .positive()
    .nullable(),

  departmentLimit: z
    .number()
    .int()
    .positive()
    .nullable(),

  ticketLimit: z
    .number()
    .int()
    .positive()
    .nullable(),

  automaticTicketAssignment: z.boolean(),

  slaManagement: z.boolean(),
});


export type CreateSubscriptionPlanDTO = z.infer<
  typeof createSubscriptionPlanSchema
>;
