import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import CreateDepartmentModal from "../components/CreateDepartmentModal";
import type { CreateDepartmentFormData } from "../schemas/departmentValidation";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import { getDepartmentByIdThunk } from "../../../redux/slices/department/departmentThunk";

import {
  updateDepartment,
  updateDepartmentStatus,
} from "../services/DepartmentServices";

type DepartmentTab = "overview" | "categories" | "employees";

const ViewDepartmentPage = () => {
  const { departmentId } = useParams<{
    departmentId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<DepartmentTab>("overview");

  const [isUpdatingStatus, setIsUpdatingStatus] =
    useState(false);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [isSavingDepartment, setIsSavingDepartment] =
    useState(false);

  const {
    selectedDepartment,
    isDetailsLoading,
    detailsError,
  } = useAppSelector((state) => state.department);

  useEffect(() => {
    if (departmentId) {
      dispatch(getDepartmentByIdThunk(departmentId));
    }
  }, [dispatch, departmentId]);

  const department =
    selectedDepartment?.id === departmentId
      ? selectedDepartment
      : null;

  const formatDate = (value?: string) => {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const tabs: { id: DepartmentTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "employees", label: "Employees" },
  ];

  const summaryCards = [
    {
      title: "Categories",
      value: "—",
      description: "Total categories",
      icon: "tags",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Employees",
      value: "—",
      description: "Department members",
      icon: "users",
      iconStyle: "bg-violet-50 text-violet-600",
    },
    {
      title: "Active Employees",
      value: "—",
      description: "Currently active",
      icon: "user-check",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
  ];

  // Activate / Deactivate Department
  const handleToggleDepartmentStatus = async () => {
    if (!department || isUpdatingStatus || isSavingDepartment) {
      return;
    }

    const newStatus =
      department.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    setIsUpdatingStatus(true);

    try {
      await updateDepartmentStatus(
        department.id,
        newStatus,
      );

      toast.success(
        newStatus === "ACTIVE"
          ? "Department activated successfully"
          : "Department deactivated successfully",
      );

      try {
        await dispatch(
          getDepartmentByIdThunk(department.id),
        ).unwrap();
      } catch {
        toast.error(
          "Status updated, but refreshing department details failed",
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(
          typeof message === "string"
            ? message
            : "Failed to update department status",
        );
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update department status",
        );
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Update Department Details
  const handleUpdateDepartment = async (
    data: CreateDepartmentFormData,
  ) => {
    if (!department || isSavingDepartment || isUpdatingStatus) {
      return;
    }

    setIsSavingDepartment(true);

    try {
      await updateDepartment(department.id, {
        name: data.name.trim(),
        code: data.code.trim().toUpperCase(),
        description: data.description?.trim() ?? "",
      });

      toast.success("Department updated successfully");
      setIsEditModalOpen(false);

      try {
        await dispatch(
          getDepartmentByIdThunk(department.id),
        ).unwrap();
      } catch {
        toast.error(
          "Department updated, but refreshing details failed",
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(
          typeof message === "string"
            ? message
            : "Failed to update department",
        );
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update department",
        );
      }
    } finally {
      setIsSavingDepartment(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
      >
        <span aria-hidden="true">←</span>
        Back to Departments
      </button>

      {/* Department Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {isDetailsLoading && !department ? (
          <p className="text-sm text-gray-500">
            Loading department details...
          </p>
        ) : detailsError && !department ? (
          <div role="alert" className="text-sm text-red-600">
            {detailsError}
          </div>
        ) : department ? (
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              {/* Department Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M15 14v.01M15 17v.01"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {department.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {department.code}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      department.status === "ACTIVE"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {department.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Manager:{" "}
                  {department.managerId
                    ? "Assigned"
                    : "Not assigned"}
                </p>
              </div>
            </div>

            {/* Edit and Activate / Deactivate Buttons */}
            <div className="flex flex-wrap items-start gap-2 sm:items-center">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                disabled={
                  isUpdatingStatus ||
                  isSavingDepartment
                }
                className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Edit Department
              </button>

              <button
                type="button"
                onClick={handleToggleDepartmentStatus}
                disabled={
                  isUpdatingStatus ||
                  isSavingDepartment
                }
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  department.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-300"
                    : "bg-green-600 hover:bg-green-700 focus:ring-green-300"
                }`}
              >
                {isUpdatingStatus
                  ? "Updating..."
                  : department.status === "ACTIVE"
                    ? "Deactivate"
                    : "Activate"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            Department details are unavailable.
          </div>
        )}
      </div>

      {/* Summary Cards */}
      {department && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {card.title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-gray-900">
                      {card.value}
                    </p>

                    <p className="mt-2 text-xs text-gray-400">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    {card.icon === "tags" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3.4 13.4a2 2 0 0 1 0-2.82l7.17-7.17A2 2 0 0 1 12 2.83h7a2 2 0 0 1 2 2v7a2 2 0 0 1-.41 1.58Z"
                        />
                        <circle cx="16.5" cy="7.5" r="1" />
                      </svg>
                    )}

                    {card.icon === "users" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                        />
                      </svg>
                    )}

                    {card.icon === "user-check" && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.7}
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 11l2 2 4-4"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div className="border-b border-gray-200">
              <div
                className="flex gap-6 overflow-x-auto"
                role="tablist"
                aria-label="Department sections"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  General Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Basic information about this department.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">
                      Department Name
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {department.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Department Code
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {department.code}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Manager
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {department.managerId || "Not assigned"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Status
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {department.status}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">
                      Description
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                      {department.description ||
                        "No description provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Created At
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {formatDate(department.createdAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Last Updated
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {formatDate(department.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Categories */}
            {activeTab === "categories" && (
              <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <span className="text-xl">#</span>
                </div>

                <h2 className="mt-4 font-semibold text-gray-900">
                  Department Categories
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Categories belonging to this department will appear here.
                </p>
              </div>
            )}

            {/* Employees */}
            {activeTab === "employees" && (
              <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                    />
                  </svg>
                </div>

                <h2 className="mt-4 font-semibold text-gray-900">
                  Department Employees
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Employees belonging to this department will appear here.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Reusable Create / Edit Department Modal */}
      <CreateDepartmentModal
        isOpen={isEditModalOpen}
        mode="edit"
        department={department}
        isSubmitting={isSavingDepartment}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateDepartment}
      />
    </div>
  );
};

export default ViewDepartmentPage;