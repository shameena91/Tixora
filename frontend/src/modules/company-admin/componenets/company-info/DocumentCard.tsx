import { FileText } from "lucide-react";

interface DocumentCardProps {
  name: string;
  date: string;
  status: string;
  pending?: boolean;
}

const DocumentCard = ({
  name,
  date,
  status,
  pending = false,
}: DocumentCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <FileText className="h-4 w-4" />
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-900">
            {name}
          </h4>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {date}
          </p>
        </div>
      </div>

      <span
        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
          pending
            ? "bg-amber-100 text-amber-700"
            : "bg-emerald-100 text-emerald-700"
        }`}
      >
        {status}
      </span>
    </div>
  );
};

export default DocumentCard;