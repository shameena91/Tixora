import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import toast from "react-hot-toast";

import type { Timeline } from "../../types/TimelineType";
import { getCompanyRequestTimeline } from "../../services/superadminServices";


interface CompanyRequestTimelineProps {
  companyRequestId: string;
}

const CompanyRequestTimeline = ({
  companyRequestId,
}: CompanyRequestTimelineProps) => {
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);

        const response =
          await getCompanyRequestTimeline(
            companyRequestId
          );
console.log("time line",response)
        setTimeline(response.data ?? []);
      } catch (error) {
        console.error(
          "Failed to fetch company request timeline:",
          error
        );

        toast.error(
          "Failed to load request timeline"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [companyRequestId]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
          <Clock3
            size={20}
            className="text-[#7C3AED]"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Request Timeline
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track the activity and status changes of this company request.
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-500">
            Loading timeline...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && timeline.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-gray-200 p-8 text-center">
          <p className="text-sm text-gray-500">
            No timeline events found.
          </p>
        </div>
      )}

      {/* Timeline */}
      {!loading && timeline.length > 0 && (
        <div className="mt-8">
          {timeline.map((item, index) => (
            <div
              key={item.id}
              className="relative flex gap-4"
            >
              {/* Vertical Line */}
              {index !== timeline.length - 1 && (
                <div className="absolute left-[11px] top-6 h-full w-px bg-gray-200" />
              )}

              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100">
                <div className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium text-gray-900">
                    {item.action}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <p className="mt-1 text-sm text-gray-500">
                  {item.description}
                </p>

                {/* Document Type */}
                {item.metadata &&
                  typeof item.metadata === "object" &&
                  "documentType" in item.metadata && (
                    <p className="mt-2 text-xs text-gray-400">
                      Document:{" "}
                      {String(
                        item.metadata.documentType
                      )}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyRequestTimeline;