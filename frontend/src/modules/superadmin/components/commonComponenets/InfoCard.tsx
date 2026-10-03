import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const InfoCard = ({
  title,
  subtitle,
  icon,
  children,
}: InfoCardProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Tixora Accent */}
      <div className="h-1 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]" />

      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-[#7C3AED]">
              {icon}
            </span>
          )}

          <h2 className="text-sm font-semibold text-gray-900">
            {title}
          </h2>
        </div>

        {subtitle && (
          <p className="mt-1 text-xs text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;