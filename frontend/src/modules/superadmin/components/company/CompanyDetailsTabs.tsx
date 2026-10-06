import {
  CreditCard,
  FileText,
  Headphones,
  Users,
} from "lucide-react";
import type { Tab } from "../../pages/company/CompanyDetails";



interface CompanyDetailsTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const CompanyDetailsTabs = ({
  activeTab,
  onTabChange,
}: CompanyDetailsTabsProps) => {
  const tabs: {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "overview",
      label: "Overview",
      icon: FileText,
    },
    {
      id: "subscription",
      label: "Subscription",
      icon: CreditCard,
    },
    {
      id: "admins",
      label: "Company Admins",
      icon: Users,
    },
    {
      id: "billing",
      label: "Billing History",
      icon: CreditCard,
    },
    {
      id: "tickets",
      label: "Support Tickets",
      icon: Headphones,
    },
  ];

  return (
    <div className="border-b border-gray-100 px-6">
      <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex shrink-0 items-center gap-2 py-4 text-sm font-medium transition ${
                isActive
                  ? "text-[#7C3AED]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />

              {tab.label}

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#7C3AED]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyDetailsTabs;