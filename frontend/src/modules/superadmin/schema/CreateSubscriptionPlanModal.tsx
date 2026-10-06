
import { z } from "zod";

const createSubscriptionPlanValidationSchema = z
  .object({
    name: z
      .string()
      .min(1, "Please select a plan"),

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
  })
  .superRefine((data, ctx) => {
    // Free plan can have zero price
    if (data.name === "FREE") {
      return;
    }

    // Paid plans must have a monthly price
    if (data.monthlyPrice === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["monthlyPrice"],
        message: "Monthly price is required",
      });
    }

    // Paid plans must have a yearly price
    if (data.yearlyPrice === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["yearlyPrice"],
        message: "Yearly price is required",
      });
    }
  });

export type PlanSubscriptionData = z.infer<
  typeof createSubscriptionPlanValidationSchema
>;

export default createSubscriptionPlanValidationSchema;

