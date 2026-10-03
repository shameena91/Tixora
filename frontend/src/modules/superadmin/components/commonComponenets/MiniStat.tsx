import type { ReactNode } from "react";

interface MiniStatProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const MiniStat = ({
  title,
  value,
  icon,
}: MiniStatProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {title}
        </span>

        <span className="text-[#7C3AED]">
          {icon}
        </span>
      </div>

      <p className="text-2xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

export default MiniStat;