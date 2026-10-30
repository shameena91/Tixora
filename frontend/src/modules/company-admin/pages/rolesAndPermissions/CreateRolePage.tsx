import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, LoaderCircle, AlertCircle } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

import {
  createRoleThunk,
  getRoleByIdThunk,
  updateRoleThunk,
} from "../../../../redux/slices/roles/roleThunk";

import PermissionSelector from "../../componenets/rolesAndPermissions/PermissionSelector";

import { createRoleSchema } from "../../schemas/roleValidatation";

import type { PermissionCode } from "../../../../shared/constants/permissionCatalog";
import type { RoleResponseDTO } from "../../types/roles/RoleUI";

interface CreateRoleErrors {
  name?: string;
  description?: string;
  permissions?: string;
}

function CreateRolePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { roleId } = useParams<{ roleId: string }>();

  const isEditMode = Boolean(roleId);

  const { selectedRole, isDetailsLoading, detailsError } = useAppSelector(
    (state) => state.roles,
  );
  useEffect(() => {
    if (roleId) {
      dispatch(getRoleByIdThunk(roleId));
    }
  }, [dispatch, roleId]);


  const role = selectedRole?.id === roleId ? selectedRole : null;
   if (isEditMode && !role && isDetailsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }

  if (isEditMode && !role && detailsError) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <p className="text-sm text-red-500">{detailsError}</p>

        <button
          type="button"
          onClick={() => navigate("/company-admin/roles-management")}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Back to Roles
        </button>
      </div>
    );
  }

  // Handle invalid role ID or unavailable role.
  if (isEditMode && !role) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-slate-500">Role not found.</p>

        <button
          type="button"
          onClick={() => navigate("/company-admin/roles-management")}
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Back to Roles
        </button>
      </div>
    );
  }

  return <RoleFormContent role={role} />;
}

// --------------------------------------------------
// Create / Edit Form
// --------------------------------------------------

interface RoleFormContentProps {
  role: RoleResponseDTO | null;
}

function RoleFormContent({ role }: RoleFormContentProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isEditMode = Boolean(role);

  const isLoading = useAppSelector((state) =>
    isEditMode ? state.roles.isUpdating : state.roles.isLoading,
  );

  // Initialize form values from the role.
  // Create Mode: Empty values.
  // Edit Mode: Existing role values.
  const [name, setName] = useState(role?.name ?? "");

  const [description, setDescription] = useState(role?.description ?? "");

  const [permissions, setPermissions] = useState<PermissionCode[]>(
    (role?.permissions ?? []) as PermissionCode[],
  );

  const [errors, setErrors] = useState<CreateRoleErrors>({});

  const [error, setError] = useState<string | null>(null);

  // Handle Form Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setErrors({});

    const result = createRoleSchema.safeParse({
      name,
      description,
      permissions,
    });

    // Validation
    if (!result.success) {
      const fieldErrors: CreateRoleErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          (field === "name" ||
            field === "description" ||
            field === "permissions") &&
          !fieldErrors[field]
        ) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      if (isEditMode && role) {
  
        await dispatch(
          updateRoleThunk({
            roleId: role.id,
            data: result.data,
          }),
        ).unwrap();

        navigate(`/company-admin/roles-management/${role.id}`);
      } else {
       
        await dispatch(createRoleThunk(result.data)).unwrap();

        navigate("/company-admin/roles-management");
      }
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : isEditMode
            ? "Failed to update role"
            : "Failed to create role",
      );
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? "Edit Role" : "Create Role"}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {isEditMode
              ? "Update role information and permissions."
              : "Create a custom role and assign permissions."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Information */}

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Role Information
          </h2>

          <p className="mb-6 mt-1 text-sm text-slate-500">
            Enter the basic details of the role.
          </p>

          <div className="grid grid-cols-1 gap-5">
            {/* Role Name */}

            <div>
              <label
                htmlFor="roleName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Role Name <span className="text-red-500">*</span>
              </label>

              <input
                id="roleName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    name: undefined,
                  }));
                }}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-violet-500"
                }`}
                placeholder="Enter role name"
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Description */}

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    description: undefined,
                  }));
                }}
                maxLength={500}
                rows={4}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                  errors.description
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-violet-500"
                }`}
                placeholder="Enter role description"
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}

              <p className="mt-1 text-right text-xs text-slate-400">
                {description.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Permissions */}

        <PermissionSelector
          selectedPermissions={permissions}
          onChange={(value) => {
            setPermissions(value);

            setErrors((prev) => ({
              ...prev,
              permissions: undefined,
            }));
          }}
          error={errors.permissions}
        />

        {/* API Error */}

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Actions */}

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isLoading}
            className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <LoaderCircle size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {isLoading
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
                ? "Save Changes"
                : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRolePage;
