
import {  useState, type FormEvent } from "react";
import { X, User, Building2, Layers, CalendarDays } from "lucide-react";

import type {
  Employee,
  UpdateEmployeePayload,
} from "../../types/EmployeeUI";

interface DepartmentOption {
  id: string;
  name: string;
}

interface RoleOption {
  id: string;
  name: string;
}

interface CategoryOption {
  id: string;
  name: string;
  departmentId: string;
}
interface DepartmentManagerOption {
  id: string; // Account ID
  name: string;
}
// interface EmployeeEditModalProps {
//   isOpen: boolean;
//   employee: Employee;
//   departments?: DepartmentOption[];
//   roles?: RoleOption[];
//   categories?: CategoryOption[];
//   isSubmitting?: boolean;
//   onClose: () => void;
//   onSubmit: (data: UpdateEmployeePayload) => Promise<void>;
// }
interface EmployeeEditModalProps {
  isOpen: boolean;
  employee: Employee;
  departments?: DepartmentOption[];
  roles?: RoleOption[];
  categories?: CategoryOption[];
  currentDepartmentManager?: DepartmentManagerOption | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateEmployeePayload) => Promise<void>;
}
const normalizeRole = (role: string) =>
  role.trim().toUpperCase().replace(/[\s-]+/g, "_");

const formatDateForInput = (date: string) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toISOString().split("T")[0];
};

const EmployeeEditModal = ({
  isOpen,
  employee,
currentDepartmentManager,
  roles = [],
  categories = [],
  isSubmitting = false,
  onClose,
  onSubmit,
}: EmployeeEditModalProps) => {
  


const [formData, setFormData] = useState(() => ({
  firstName: employee.firstName,
  lastName: employee.lastName,
  phone: employee.phone,
  departmentId: employee.departmentId,
  roleId: employee.roleId,
  categoryIds: employee.categoryIds ?? [],
  joiningDate: formatDateForInput(employee.joiningDate),
}));

const [formError, setFormError] = useState("");
  // Reset form whenever the modal opens or employee changes
 const [showReplaceDialog, setShowReplaceDialog] = useState(false);

const [replacementRoleId, setReplacementRoleId] = useState("");

const [replacementCategoryIds, setReplacementCategoryIds] =
  useState<string[]>([]);
  if (!isOpen) return null;

  const selectedRole = roles.find(
    (role) => role.id === formData.roleId
  );

  const roleName = selectedRole?.name ?? employee.roleName;

  const isSupportAgent =
    normalizeRole(roleName) === "SUPPORT_AGENT";

  const filteredCategories = categories.filter(
    (category) =>
      category.departmentId === formData.departmentId
  );

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  

  const handleRoleChange = (roleId: string) => {
    const selected = roles.find((role) => role.id === roleId);

    const supportAgent =
      normalizeRole(selected?.name ?? "") === "SUPPORT_AGENT";

    setFormData((prev) => ({
      ...prev,
      roleId,
      categoryIds: supportAgent ? prev.categoryIds : [],
    }));
  };

  const handleCategoryChange = (
    categoryId: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: checked
        ? [...prev.categoryIds, categoryId]
        : prev.categoryIds.filter((id) => id !== categoryId),
    }));
  };

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   setFormError("");

  //   if (
  //     !formData.firstName.trim() ||
  //     !formData.lastName.trim() ||
  //     !formData.phone.trim() ||
  //     !formData.departmentId ||
  //     !formData.roleId
  //   ) {
  //     setFormError("Please fill in all required fields.");
  //     return;
  //   }

  //   if (isSupportAgent && formData.categoryIds.length === 0) {
  //     setFormError("Please assign at least one category to the Support Agent.");
  //     return;
  //   }

  //   const payload: UpdateEmployeePayload = {
  //     firstName: formData.firstName.trim(),
  //     lastName: formData.lastName.trim(),
  //     phone: formData.phone.trim(),
  //     departmentId: formData.departmentId,
  //     roleId: formData.roleId,
  //     categoryIds: isSupportAgent ? formData.categoryIds : [],
  //     joiningDate: formData.joiningDate,
  //   };

  //   try {
  //     await onSubmit(payload);
  //     onClose();
  //   } catch {
  //     setFormError("Failed to update employee. Please try again.");
  //   }
  // };




  const submitEmployeeUpdate = async (
  replaceManager?: UpdateEmployeePayload["replaceManager"]
) => {
  const payload: UpdateEmployeePayload = {
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    phone: formData.phone.trim(),
    departmentId: formData.departmentId,
    roleId: formData.roleId,
    categoryIds: isSupportAgent ? formData.categoryIds : [],
    joiningDate: formData.joiningDate,
    ...(replaceManager && { replaceManager }),
  };

  try {
    await onSubmit(payload);
    setShowReplaceDialog(false);
    onClose();
  } catch {
    setFormError("Failed to update employee. Please try again.");
  }
};

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setFormError("");

  if (
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.phone.trim() ||
    !formData.departmentId ||
    !formData.roleId
  ) {
    setFormError("Please fill in all required fields.");
    return;
  }

  if (isSupportAgent && formData.categoryIds.length === 0) {
    setFormError(
      "Please assign at least one category to the Support Agent."
    );
    return;
  }

  const isDepartmentAdmin =
    normalizeRole(roleName) === "DEPARTMENT_ADMIN";

  const hasDifferentManager =
    currentDepartmentManager &&
    currentDepartmentManager.id !== employee.accountId;

  if (isDepartmentAdmin && hasDifferentManager) {
    setShowReplaceDialog(true);
    return;
  }

  void submitEmployeeUpdate();
};
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-2.5 text-[#7C3AED]">
              <User size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Edit Employee
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Update employee information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="space-y-6 overflow-y-auto p-6">

            {/* Personal Information */}
            <section>
              <h3 className="text-sm font-semibold text-gray-900">
                Personal Information
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleChange("lastName", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={employee.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Email address cannot be changed here.
                  </p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>
            </section>

            {/* Work Information */}
            <section className="border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-[#7C3AED]" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Work Information
                </h3>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
  <label className="mb-1.5 block text-sm font-medium text-gray-700">
    Department
  </label>

  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
    <Building2 size={17} className="text-gray-400" />

    <span className="text-sm text-gray-600">
      {employee.departmentName || "Not Available"}
    </span>

    <span className="ml-auto text-xs text-gray-400">
      Fixed
    </span>
  </div>
</div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Employee Role *
                  </label>

                  <select
                    value={formData.roleId}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
                  >
                    <option value="">Select Role</option>

                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Joining Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) =>
                        handleChange("joiningDate", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Assigned Categories */}
            {isSupportAgent && (
              <section className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                  <Layers size={18} className="text-[#7C3AED]" />

                  <h3 className="text-sm font-semibold text-gray-900">
                    Assigned Categories
                  </h3>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Select the categories this Support Agent can handle.
                </p>

                {filteredCategories.length > 0 ? (
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {filteredCategories.map((category) => (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition hover:border-purple-200 hover:bg-purple-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.categoryIds.includes(category.id)}
                          onChange={(e) =>
                            handleCategoryChange(
                              category.id,
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 accent-[#7C3AED]"
                        />

                        <span className="text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-lg border border-dashed border-gray-200 p-4 text-center text-sm text-gray-400">
                    No categories available for this department.
                  </p>
                )}
              </section>
            )}

            {formError && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {formError}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {showReplaceDialog && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      <h3 className="text-lg font-bold text-gray-900">
        Replace Department Admin?
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        <strong>{currentDepartmentManager?.name}</strong> is the
        current Department Admin.
      </p>

      <p className="mt-3 text-sm text-gray-600">
        Select the new role for the current Department Admin.
      </p>

      <select
        value={replacementRoleId}
        onChange={(e) => {
          setReplacementRoleId(e.target.value);
          setReplacementCategoryIds([]);
        }}
        className="mt-4 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm"
      >
        <option value="">Select new role</option>

        {roles
          .filter((role) =>
            ["SUPPORT_AGENT", "NORMAL_EMPLOYEE"].includes(
              normalizeRole(role.name)
            )
          )
          .map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
      </select>

      {normalizeRole(
        roles.find((role) => role.id === replacementRoleId)?.name ?? ""
      ) === "SUPPORT_AGENT" && (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Assign Categories
          </p>

          {categories
            .filter(
              (category) =>
                category.departmentId === formData.departmentId
            )
            .map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={replacementCategoryIds.includes(category.id)}
                  onChange={(e) => {
                    setReplacementCategoryIds((prev) =>
                      e.target.checked
                        ? [...prev, category.id]
                        : prev.filter((id) => id !== category.id)
                    );
                  }}
                  className="accent-[#7C3AED]"
                />

                {category.name}
              </label>
            ))}
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setShowReplaceDialog(false)}
          disabled={isSubmitting}
          className="rounded-lg border px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={
            isSubmitting ||
            !replacementRoleId ||
            (
              normalizeRole(
                roles.find((role) => role.id === replacementRoleId)?.name ?? ""
              ) === "SUPPORT_AGENT" &&
              replacementCategoryIds.length === 0
            )
          }
          onClick={() => {
            void submitEmployeeUpdate({
              newRoleId: replacementRoleId,
              categoryIds:
                normalizeRole(
                  roles.find((role) => role.id === replacementRoleId)?.name ?? ""
                ) === "SUPPORT_AGENT"
                  ? replacementCategoryIds
                  : [],
            });
          }}
          className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting ? "Updating..." : "Confirm Replacement"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default EmployeeEditModal;
