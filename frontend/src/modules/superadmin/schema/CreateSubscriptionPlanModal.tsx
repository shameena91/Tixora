
import { z } from "zod";

const createSubscriptionPlanValidationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Plan name is required"),

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
      .int("Members limit must be a whole number")
      .positive("Members limit must be greater than zero")
      .nullable(),

    companyAdminLimit: z
      .number()
      .int("Company admins limit must be a whole number")
      .positive("Company admins limit must be greater than zero")
      .nullable(),

    departmentLimit: z
      .number()
      .int("Departments limit must be a whole number")
      .positive("Departments limit must be greater than zero")
      .nullable(),

    ticketLimit: z
      .number()
      .int("Tickets limit must be a whole number")
      .positive("Tickets limit must be greater than zero")
      .nullable(),

    automaticTicketAssignment: z.boolean(),

    slaManagement: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.limitType === "LIMITED") {
      const limits = [
        ["memberLimit", data.memberLimit],
        ["companyAdminLimit", data.companyAdminLimit],
        ["departmentLimit", data.departmentLimit],
        ["ticketLimit", data.ticketLimit],
      ] as const;

      limits.forEach(([field, value]) => {
        if (value === null) {
          ctx.addIssue({
            code: "custom",
            path: [field],
            message: "This field is required",
          });
        }
      });
    }
  });

export default createSubscriptionPlanValidationSchema;
