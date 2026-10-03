import {
    FolderTree,
    ShieldCheck,
    Ticket,
    Users,
} from "lucide-react";

import type {
    SubScriptionListItems,
} from "../../../../redux/slices/subscriptionPlanSlice";

interface SubscriptionPlanCardProps {
  plan: SubScriptionListItems;
  buttonText: string;
  onButtonClick: () => void;
}

const SubscriptionPlanCard = ({
  plan,
  buttonText,
  onButtonClick,
}: SubscriptionPlanCardProps) => {
  // ------------------------------------
  // Helpers
  // ------------------------------------
  const formatPrice = (price: number) => {
    if (price === 0) {
      return "Free";
    }

    return `₹${price.toLocaleString("en-IN")}`;
  };

  const formatLimit = (
    limit: number | null,
    label: string
  ) => {
    if (limit === null) {
      return `Unlimited ${label}`;
    }

    return `${limit} ${label}`;
  };

  const getPlanDisplayName = (name: string) => {
    return (
      name
        .toLowerCase()
        .split("_")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ") + " Plan"
    );
  };

  const isProfessional =
    plan.name === "PROFESSIONAL";

  const getPlanFeatures = () => {
    const features = [
      {
        text: formatLimit(
          plan.memberLimit,
          "Employees"
        ),
        icon: Users,
      },
      {
        text: formatLimit(
          plan.companyAdminLimit,
          "Company Admins"
        ),
        icon: ShieldCheck,
      },
      {
        text: formatLimit(
          plan.departmentLimit,
          "Departments"
        ),
        icon: FolderTree,
      },
      {
        text: formatLimit(
          plan.ticketLimit,
          "Tickets / Month"
        ),
        icon: Ticket,
      },
    ];

    if (plan.automaticTicketAssignment) {
      features.push({
        text: "Automatic Ticket Assignment",
        icon: ShieldCheck,
      });
    } else {
      features.push({
        text: "Manual Ticket Assignment",
        icon: ShieldCheck,
      });
    }

    if (plan.slaManagement) {
      features.push({
        text: "SLA Management",
        icon: ShieldCheck,
      });
    }

    return features;
  };

  const features = getPlanFeatures();

  return (
    <div
      className={`relative flex min-h-[620px] w-full flex-col rounded-xl bg-white p-6 sm:w-[340px] ${
        isProfessional
          ? "border-2 border-[#7C3AED] shadow-md"
          : "border border-gray-200 shadow-sm"
      }`}
    >
      {/* Recommended */}
      {isProfessional && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#7C3AED] px-4 py-1 text-[11px] font-semibold text-white">
          Recommended
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {getPlanDisplayName(plan.name)}
        </h2>

        <p className="mt-2 min-h-[40px] text-sm leading-5 text-gray-500">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mt-7 flex items-end gap-1">
          <span className="text-3xl font-bold tracking-tight text-gray-900">
            {formatPrice(plan.monthlyPrice)}
          </span>

          {plan.monthlyPrice > 0 && (
            <span className="mb-1 text-sm text-gray-500">
              /month
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-gray-400">
          {plan.monthlyPrice > 0
            ? `₹${plan.yearlyPrice.toLocaleString(
                "en-IN"
              )} billed yearly`
            : "No credit card required"}
        </p>
      </div>

      {/* Features */}
      <div className="flex-1 py-7">
        <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Includes
        </p>

        <ul className="space-y-4">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;

            return (
              <li
                key={index}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50">
                  <FeatureIcon className="h-3.5 w-3.5 text-[#7C3AED]" />
                </div>

                <span>{feature.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Action Button */}
      <div className="pt-5">
        <button
          type="button"
          onClick={onButtonClick}
          className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition ${
            isProfessional
              ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlanCard;