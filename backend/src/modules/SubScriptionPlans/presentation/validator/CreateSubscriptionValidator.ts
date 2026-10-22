import { z } from "zod";
import { BillingCycle } from "../../domain/entities/Subscription";

export const createSubscriptionSchema = z.object({
  planId: z.string().min(1, "Plan ID is required"),
  billingCycle: z.enum([
    BillingCycle.MONTHLY,
    BillingCycle.YEARLY,
  ]),
  isRenewal: z.boolean().optional().default(false),
  isUpgrade: z.boolean().optional().default(false),
});

export type CreateSubscriptionDTO =
  z.infer<typeof createSubscriptionSchema>;
