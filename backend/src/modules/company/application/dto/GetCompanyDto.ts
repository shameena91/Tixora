import { BillingCycle, SubscriptionStatus } from "../../../subScriptionPlans/domain/entities/Subscription";
import { CompanyStatus } from "../../domain/entities/Company";
import { CompanyLocation } from "../../domain/types/CompanyLocation";

export interface CompanyDetailsResponse {
  id: string;
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: number | null;
  companyType: string;
  numberOfEmployees: string;
  website: string | null;
  logo: string | null;
  description: string | null;
  location:CompanyLocation|null
  subscription:{
    subscriptionName:string|null,
    billingCycle:BillingCycle|null
    status:SubscriptionStatus|null

  }
  status:CompanyStatus|null
    admin: {
    name: string;
    email: string;
  };
  
}