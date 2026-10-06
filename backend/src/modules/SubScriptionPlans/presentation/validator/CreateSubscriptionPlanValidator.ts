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
    .int("Member limit must be a whole number")
    .positive("Member limit must be greater than 0")
    .nullable(),

  companyAdminLimit: z
    .number()
    .int("Company admin limit must be a whole number")
    .positive("Company admin limit must be greater than 0")
    .nullable(),

  departmentLimit: z
    .number()
    .int("Department limit must be a whole number")
    .positive("Department limit must be greater than 0")
    .nullable(),

  ticketLimit: z
    .number()
    .int("Ticket limit must be a whole number")
    .positive("Ticket limit must be greater than 0")
    .nullable(),

  automaticTicketAssignment: z.boolean(),

  slaManagement: z.boolean(),
});

export type CreateSubscriptionPlanDTO = z.infer<
  typeof createSubscriptionPlanSchema
>;