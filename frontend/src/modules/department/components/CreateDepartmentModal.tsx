import { useState, type FormEvent } from "react";

import { createDepartmentSchema } from "../schemas/departmentValidation";
import type { Department } from "../types/departmentTypes";

type DepartmentFormData = {
  name: string;
  code: string;
  description: string;
};

type DepartmentFormErrors = {
  name?: string;
  code?: string;
  description?: string;
};

interface CreateDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: DepartmentFormData,
  ) => void | Promise<void>;
  mode?: "create" | "edit";
  department?: Department | null;
  isSubmitting?: boolean;
}

const CreateDepartmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  department = null,
  isSubmitting = false,
}: CreateDepartmentModalProps) => {
  if (!isOpen || (mode === "edit" && !department)) {
    return null;
  }

  return (
    <DepartmentModalForm
      key={`${mode}-${department?.id ?? "new"}`}
      mode={mode}
      department={department}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

interface DepartmentModalFormProps {
  mode: "create" | "edit";
  department: Department | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    data: DepartmentFormData,
  ) => void | Promise<void>;
}

const DepartmentModalForm = ({
  mode,
  department,
  isSubmitting,
  onClose,
  onSubmit,
}: DepartmentModalFormProps) => {
  const isEditMode = mode === "edit";

  // Initialize form values directly from the department.
  // No useEffect or setState inside an effect is needed.
  const [name, setName] = useState(
    () => department?.name ?? "",
  );

  const [code, setCode] = useState(
    () => department?.code ?? "",
  );

  const [description, setDescription] = useState(
    () => department?.description ?? "",
  );

  const [errors, setErrors] = useState<DepartmentFormErrors>(
    {},
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const result = createDepartmentSchema.safeParse({
      name,
      code,
      description,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        code: fieldErrors.code?.[0],
        description: fieldErrors.description?.[0],
      });

      return;
    }

    setErrors({});

    await onSubmit({
      name: result.data.name.trim(),
      code: result.data.code.trim().toUpperCase(),
      description: result.data.description?.trim() ?? "",
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="department-modal-title"
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2
              id="department-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {isEditMode
                ? "Edit Department"
                : "Create Department"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {isEditMode
                ? "Update the department information."
                : "Add a new department to your company."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5 px-6 py-5">
            {/* Department Name */}
            <div>
              <label
                htmlFor="department-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Department Name *
              </label>

              <input
                id="department-name"
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    name: undefined,
                  }));
                }}
                placeholder="e.g. Information Technology"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name
                    ? "department-name-error"
                    : undefined
                }
                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />

              {errors.name && (
                <p
                  id="department-name-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Department Code */}
            <div>
              <label
                htmlFor="department-code"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Department Code *
              </label>

              <input
                id="department-code"
                type="text"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value.toUpperCase());
                  setErrors((previous) => ({
                    ...previous,
                    code: undefined,
                  }));
                }}
                placeholder="e.g. IT"
                maxLength={20}
                aria-invalid={Boolean(errors.code)}
                aria-describedby={
                  errors.code
                    ? "department-code-error"
                    : undefined
                }
                className={`w-full rounded-lg border px-3 py-2.5 text-sm uppercase outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.code
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />

              {errors.code ? (
                <p
                  id="department-code-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.code}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  Enter a unique code for this department.
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="department-description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="department-description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    description: undefined,
                  }));
                }}
                placeholder="Describe the department (optional)"
                rows={3}
                maxLength={500}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? "department-description-error"
                    : undefined
                }
                className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 ${
                  errors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />

              {errors.description && (
                <p
                  id="department-description-error"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartmentModal;