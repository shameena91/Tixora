import z from "zod";
import { createCompanyRequestSchema } from "../Validators/CreateCompanyRequestSchema";

export type CreateCompanyRequestDto =
  z.infer<typeof createCompanyRequestSchema>;