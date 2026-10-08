interface CompanyInformationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CompanyInformationTabs = ({
  activeTab,
  onTabChange,
}: CompanyInformationTabsProps) => {
  const tabs = [
    "Company Information",
    "Verification & Documents",
    
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="flex items-center gap-8 overflow-x-auto px-7 pt-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`relative whitespace-nowrap px-1 py-4 text-sm font-medium transition-colors ${
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}

              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyInformationTabs;