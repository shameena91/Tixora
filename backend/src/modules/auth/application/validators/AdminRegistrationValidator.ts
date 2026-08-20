import { number, z } from "zod";

export const adminRegistrationSchema = z.object({
  email: z.email("Invalid email format").trim(),
    
  
    

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters"),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  designation: z
    .string()
    .trim()
    .min(2, "Designation must be at least 2 characters")
    .max(100, "Designation must not exceed 100 characters"),
});

export type AdminRegistrationRequestDto =
  z.infer<typeof adminRegistrationSchema>;