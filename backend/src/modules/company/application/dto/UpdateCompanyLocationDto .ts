import z from "zod";
import { updateCompanyLocationSchema } from "../Validators/UpdateCompanyLocationSchema";

export type UpdateCompanyLocationDto =
  z.infer<typeof updateCompanyLocationSchema>;