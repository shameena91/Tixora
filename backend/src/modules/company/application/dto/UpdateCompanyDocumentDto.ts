import z from "zod";
import { updateCompanyDocumentsSchema } from "../Validators/UpdateCompanyDocumentSchema";

export type UpdateCompanyDocumentsDto =
  z.infer<typeof updateCompanyDocumentsSchema>;