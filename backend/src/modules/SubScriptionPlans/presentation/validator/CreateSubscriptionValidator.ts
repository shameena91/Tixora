import { z } from "zod";
import { BillingCycle } from "../../domain/entities/Subscription";

export const createSubscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  billingCycle: z.enum([
    BillingCycle.MONTHLY,
    BillingCycle.YEARLY,
  ]),
});

export type CreateSubscriptionDTO =
  z.infer<typeof createSubscriptionSchema>;