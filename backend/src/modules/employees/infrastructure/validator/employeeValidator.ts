import { z } from "zod";
import { EmployeeStatus } from "../../domain/entities/employee";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID");

export const createEmployeeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().min(10, "Invalid phone number"),


  departmentId: objectIdSchema,
  roleId: objectIdSchema,
  categoryIds: z.array(objectIdSchema).default([]),

  profilePhoto: z.string().nullable().optional(),
  joiningDate: z.coerce.date(),
});

export const updateEmployeeSchema = z
  .object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    phone: z.string().trim().min(10).optional(),


    departmentId: objectIdSchema.optional(),
    roleId: objectIdSchema.optional(),
    categoryIds: z.array(objectIdSchema).optional(),

    profilePhoto: z.string().nullable().optional(),
    joiningDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field is required to update",
    },
  );

export const updateEmployeeStatusSchema = z.object({
  status: z.enum([
    EmployeeStatus.ACTIVE,
    EmployeeStatus.INACTIVE,
  ]),
});