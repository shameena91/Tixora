import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  LoaderCircle,
  AlertCircle,
  Power,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import {
  getRoleByIdThunk,
  updateRoleStatusThunk,
} from "../../../../redux/slices/roles/roleThunk";
import RoleOverview from "../../componenets/rolesAndPermissions/RoleOverview";
import RolePermissions from "../../componenets/rolesAndPermissions/RolePermissions";
import type { RoleStatus } from "../../types/roles/RoleUI";
import BaseModal from "../../../../components/common/BaseModal";

type RoleTab = "overview" | "permissions" | "employees";

function RoleDetailsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string }>();

  const [activeTab, setActiveTab] = useState<RoleTab>("overview");
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const { selectedRole, isDetailsLoading, detailsError, isStatusUpdating } =
    useAppSelector((state) => state.roles);

  useEffect(() => {
    if (roleId) {
      dispatch(getRoleByIdThunk(roleId));
    }
  }, [dispatch, roleId]);

  // Prevent showing the previous role while another role is loading.
  const role = selectedRole?.id === roleId ? selectedRole : null;

  const handleBack = () => {
    navigate("/company-admin/roles-management");
  };

  const handleEdit = () => {
    if (role) {
      navigate(`/company-admin/roles/${role.id}/edit`);
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!role) return;

    const nextStatus: RoleStatus =
      role.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      await dispatch(
        updateRoleStatusThunk({
          roleId: role.id,
          roleStatus: nextStatus,
        }),
      ).unwrap();

      setIsStatusModalOpen(false);
    } catch (err) {
      setStatusError(
        typeof err === "string" ? err : "Failed to update role status",
      );
    }
  };
  const handleToggleStatus = () => {
    setStatusError(null);
    setIsStatusModalOpen(true);
  };
  if (isDetailsLoading && !role) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (detailsError && !role) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <h2 className="text-lg font-semibold text-slate-800">
          Unable to load role
        </h2>

        <p className="text-sm text-slate-500">{detailsError}</p>

        <button
          type="button"
          onClick={handleBack}
          className="mt-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Back to Roles
        </button>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Role not found</h2>

        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Back to Roles
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to Roles
          </button>

          <h1 className="text-2xl font-bold text-slate-800">{role.name}</h1>

          <p className="mt-1 text-sm text-slate-500">
            View role information and assigned permissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleToggleStatus}
            disabled={isStatusUpdating}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${
              role.status === "ACTIVE"
                ? "border-red-200 text-red-600 hover:bg-red-50"
                : "border-green-200 text-green-600 hover:bg-green-50"
            }`}
          >
            <Power size={16} />

            {role.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Pencil size={16} />
            Edit Role
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
              activeTab === "overview"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("permissions")}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
              activeTab === "permissions"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Permissions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("employees")}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition ${
              activeTab === "employees"
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Employees
          </button>
        </div>
      </div>

      <div>
        {activeTab === "overview" ? (
          <RoleOverview role={role} />
        ) : (
          <RolePermissions permissions={role.permissions} />
        )}
      </div>
      <BaseModal
        isOpen={isStatusModalOpen}
        title={role.status === "ACTIVE" ? "Deactivate Role?" : "Activate Role?"}
        description={
          role.status === "ACTIVE"
            ? `Are you sure you want to deactivate "${role.name}"?`
            : `Are you sure you want to activate "${role.name}"?`
        }
        onClose={() => {
          setIsStatusModalOpen(false);
          setStatusError(null);
        }}
        onSubmit={handleConfirmStatusChange}
        submitLabel={role.status === "ACTIVE" ? "Deactivate" : "Activate"}
        cancelLabel="Cancel"
        isSubmitting={isStatusUpdating}
      >
        <div className="flex items-start gap-3">
          <div
            className={`rounded-full p-3 ${
              role.status === "ACTIVE" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <Power
              size={22}
              className={
                role.status === "ACTIVE" ? "text-red-600" : "text-green-600"
              }
            />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">{role.name}</p>

            <p className="mt-1 text-sm text-slate-500">
              {role.status === "ACTIVE"
                ? "Deactivating this role may affect the access of employees assigned to it."
                : "Activating this role will make it available for use again."}
            </p>
          </div>
        </div>

        {statusError && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {statusError}
          </p>
        )}
      </BaseModal>
    </div>
  );
}

export default RoleDetailsPage;
