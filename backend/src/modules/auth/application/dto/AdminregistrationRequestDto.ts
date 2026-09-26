import z from "zod";
import { adminRegistrationSchema } from "../validators/AdminRegistrationValidator";

export type AdminRegistrationRequestDto =
  z.infer<typeof adminRegistrationSchema>;