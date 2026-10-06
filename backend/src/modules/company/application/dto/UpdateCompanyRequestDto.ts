import z from "zod";
import { updateCompanyRequestSchema } from "../Validators/UpdateCompanyRequestSchema";

export type UpdateCompanyRequestDto =
  z.infer<typeof updateCompanyRequestSchema>;