import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks/hooks";

interface RecentRequest {
  companyName: string;
  submittedAt: string;
  status: "Pending" | "Approved" | "Rejected";
}

const recentRequests: RecentRequest[] = [
  {
    companyName: "ABC Technologies",
    submittedAt: "Submitted today",
    status: "Pending",
  },
  {
    companyName: "Nova Solutions",
    submittedAt: "Submitted yesterday",
    status: "Approved",
  },
  {
    companyName: "Pixel Systems",
    submittedAt: "Submitted 2 days ago",
    status: "Pending",
  },
];

interface Notification {
  title: string;
  message: string;
  time: string;
}

const notifications: Notification[] = [
  {
    title: "New company registration request",
    message: "ABC Technologies submitted a request.",
    time: "10 minutes ago",
  },
  {
    title: "Company request approved",
    message: "Nova Solutions was approved.",
    time: "1 hour ago",
  },
  {
    title: "New registration request",
    message: "Pixel Systems submitted a request.",
    time: "2 hours ago",
  },
];

function Dashbord() {
  const navigate = useNavigate();

  const {
    totalRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
  } = useAppSelector((state) => state.superAdminDashboard);

  console.log({
    totalRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
  });

  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-[#7C3AED]">
            Welcome to Tixora
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Welcome,
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage company registration requests and monitor your platform.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Requests */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Total Requests
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                📋
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              {totalRequests}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              All company requests
            </p>
          </div>

          {/* Pending Requests */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Pending Requests
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                ⏳
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              {pendingRequests}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Waiting for review
            </p>
          </div>

          {/* Approved Requests */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Approved Requests
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                ✓
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              {approvedRequests}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Successfully approved
            </p>
          </div>

          {/* Rejected Requests */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                Rejected Requests
              </p>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                ✕
              </div>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-800">
              {rejectedRequests}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Requests rejected
            </p>
          </div>

        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Requests */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Recent Company Requests
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest registration requests
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/super-admin/company-requests")
                }
                className="text-sm font-medium text-[#7C3AED] hover:underline"
              >
                View All
              </button>
            </div>

            {/* Temporary dummy request data */}
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.companyName}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  <div>
                    <h3 className="font-medium">
                      {request.companyName}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                      {request.submittedAt}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      request.status === "Pending"
                        ? "bg-yellow-50 text-yellow-600"
                        : request.status === "Approved"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Notifications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recent platform activity
              </p>
            </div>

            <div className="space-y-5">
              {notifications.map((notification) => (
                <div
                  key={`${notification.title}-${notification.time}`}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <p className="text-sm font-medium">
                    {notification.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {notification.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-400">
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashbord;