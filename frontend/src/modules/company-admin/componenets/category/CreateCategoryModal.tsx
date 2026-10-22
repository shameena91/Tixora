import { useState, type FormEvent } from "react";

import type {
  Category,
  CategoryFormData,
} from "../../types/categoryTypes";

import { categoryFormSchema } from "../../schemas/categoryValidation";

interface DepartmentOption {
  id: string;
  name: string;
}

interface Props {
  isOpen: boolean;
  mode: "create" | "edit";
  category: Category | null;

  departmentId?: string;

  departments: DepartmentOption[];

  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    data: CategoryFormData,
  ) => void | Promise<void>;
}

interface FormProps {
  mode: "create" | "edit";
  category: Category | null;
  departmentId?: string;
  departments: DepartmentOption[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    data: CategoryFormData,
  ) => void | Promise<void>;
}

const CategoryModalForm = ({
  mode,
  category,
  departmentId,
  departments,
  isSubmitting,
  onClose,
  onSubmit,
}: FormProps) => {
  const [name, setName] = useState(
    () => category?.name ?? "",
  );

  const [description, setDescription] = useState(
    () => category?.description ?? "",
  );

  const [selectedDepartmentId, setSelectedDepartmentId] =
    useState(
      () => departmentId ?? category?.departmentId ?? "",
    );

  const [error, setError] = useState<string | null>(null);

  // A department is fixed when the modal opens from Department Details.
  const isDepartmentFixed = Boolean(departmentId);

  // On the main page, Department must be selected when creating.
  const showDepartmentDropdown =
    mode === "create" && !isDepartmentFixed;

  const effectiveDepartmentId =
    departmentId ?? category?.departmentId ?? selectedDepartmentId;

  const selectedDepartment = departments.find(
    (department) =>
      department.id === effectiveDepartmentId,
  );

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const result = categoryFormSchema.safeParse({
      name,
      description,
      departmentId: effectiveDepartmentId,
    });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ?? "Invalid input",
      );
      return;
    }

    setError(null);

    await onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Category Name */}
      <div>
        <label
          htmlFor="category-name"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Category Name
        </label>

        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Hardware"
          required
          maxLength={100}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="category-description"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="category-description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
          rows={3}
          maxLength={500}
          placeholder="Describe this category"
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        />
      </div>

      {/* Department dropdown: only for global Create */}
      {showDepartmentDropdown ? (
        <div>
          <label
            htmlFor="category-department"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Department
          </label>

          <select
            id="category-department"
            value={selectedDepartmentId}
            onChange={(event) =>
              setSelectedDepartmentId(event.target.value)
            }
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>

          {departments.length === 0 && (
            <p className="mt-1 text-xs text-gray-500">
              No departments are available. Load the departments first.
            </p>
          )}
        </div>
      ) : (
        /* Department is already known in Department Details or Edit */
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Department
          </label>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">
            {selectedDepartment?.name ??
              (effectiveDepartmentId
                ? "Selected department"
                : "Department not selected")}
          </div>
        </div>
      )}

      {/* Validation Error */}
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onClose}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            (showDepartmentDropdown && departments.length === 0)
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Category"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

const CreateCategoryModal = ({
  isOpen,
  mode,
  category,
  departmentId,
  departments,
  isSubmitting,
  onClose,
  onSubmit,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2
          id="category-modal-title"
          className="text-xl font-semibold text-gray-900"
        >
          {mode === "create"
            ? "Create Category"
            : "Edit Category"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {mode === "create"
            ? "Add a category to a department."
            : "Update category details."}
        </p>

        <div className="mt-6">
          <CategoryModalForm
            key={`${mode}-${category?.id ?? "new"}-${departmentId ?? "global"}`}
            mode={mode}
            category={category}
            departmentId={departmentId}
            departments={departments}
            isSubmitting={isSubmitting}
            onClose={onClose}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;