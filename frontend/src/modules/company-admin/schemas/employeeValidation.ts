
import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  lastName: z.string().trim().min(1, "Last name is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^\d{10,15}$/, "Enter a valid phone number"),

  designation: z.string(),

  departmentId: z.string().min(1, "Select a department"),

  roleId: z.string().min(1, "Select a role"),

  categoryIds: z.array(z.string()),

  joiningDate: z.string().min(1, "Joining date is required"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
