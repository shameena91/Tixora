import { z } from "zod";

export const createSubscriptionPlanSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Plan name is required")
      .max(100, "Plan name is too long"),

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

    limitType: z.enum(["LIMITED", "UNLIMITED"]),

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
  })
  .superRefine((data, ctx) => {
    if (data.limitType === "LIMITED") {
      const limits = [
        { field: "memberLimit", value: data.memberLimit },
        { field: "companyAdminLimit", value: data.companyAdminLimit },
        { field: "departmentLimit", value: data.departmentLimit },
        { field: "ticketLimit", value: data.ticketLimit },
      ] as const;

      limits.forEach(({ field, value }) => {
        if (value === null) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "This limit is required for a limited plan",
          });
        }
      });
    }
  });

export type CreateSubscriptionPlanDTO = z.infer<
  typeof createSubscriptionPlanSchema
>;