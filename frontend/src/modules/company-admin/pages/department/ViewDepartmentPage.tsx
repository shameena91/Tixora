
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import CreateDepartmentModal from "../../componenets/department/CreateDepartmentModal";
import type { CreateDepartmentFormData } from "../../schemas/departmentValidation";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import { getDepartmentByIdThunk } from "../../../../redux/slices/department/departmentThunk";

import {
  updateDepartment,
  updateDepartmentStatus,
} from "../../services/department/DepartmentServices";
import DepartmentEmployeesTab from "../../componenets/department/DepartmentEmployeesTab";
import DepartmentCategoriesTab from "../../componenets/department/DepartmentCategoriesTab";
import DepartmentOverviewTab from "../../componenets/department/DepartmentOverviewTab";


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

  const handleToggleDepartmentStatus = async () => {
    if (
      !department ||
      isUpdatingStatus ||
      isSavingDepartment
    ) {
      return;
    }

    const newStatus =
      department.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    setIsUpdatingStatus(true);

    try {
      await updateDepartmentStatus(department.id, newStatus);

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

  const handleUpdateDepartment = async (
    data: CreateDepartmentFormData,
  ) => {
    if (
      !department ||
      isSavingDepartment ||
      isUpdatingStatus
    ) {
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
                  {department.managerId ? "Assigned" : "Not assigned"}
                </p>
              </div>
            </div>

            {/* Department Actions */}
            <div className="flex flex-wrap items-start gap-2 sm:items-center">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                disabled={isUpdatingStatus || isSavingDepartment}
                className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Edit Department
              </button>

              <button
                type="button"
                onClick={handleToggleDepartmentStatus}
                disabled={isUpdatingStatus || isSavingDepartment}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  department.status === "ACTIVE"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
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
          <p className="text-sm text-gray-500">
            Department details are unavailable.
          </p>
        )}
      </div>

      {department && (
        <>
          {/* Summary Cards */}
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
                    <span aria-hidden="true">
                      {card.icon === "tags"
                        ? "#"
                        : card.icon === "users"
                          ? "👥"
                          : "✓"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
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

            {/* Tab Components */}
            {activeTab === "overview" && (
              <DepartmentOverviewTab department={department} />
            )}
{activeTab === "categories" && (
  <DepartmentCategoriesTab
    key={department.id}
    departmentId={department.id}
  />
)}

            {activeTab === "employees" && (
              <DepartmentEmployeesTab />
            )}
          </div>
        </>
      )}

      {/* Edit Department Modal */}
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
