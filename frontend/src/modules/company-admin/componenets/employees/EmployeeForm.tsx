

import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {  Upload, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import type { CreateEmployeePayload } from "../../types/EmployeeUI";
import { createEmployeeThunk } from "../../../../redux/slices/employee/employeeThunks";
import { getAllDepartmentsThunk } from "../../../../redux/slices/department/departmentThunk";
import { getAllRolesThunk } from "../../../../redux/slices/roles/roleThunk";
import { getCategoriesByDepartmentThunk } from "../../../../redux/slices/category/categoryThunk";
import toast from "react-hot-toast";
import { employeeSchema } from "../../schemas/employeeValidation";


interface EmployeeFormProps {
  mode: "create";
  onCancel: () => void;
}

interface EmployeeFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  departmentId: string;
  roleId: string;
  categoryIds: string[];
  joiningDate: string;
}

const initialFormData: EmployeeFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  designation: "",
  departmentId: "",
  roleId: "",
  categoryIds: [],
  joiningDate: "",
};

const EmployeeForm = ({ onCancel }: EmployeeFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<EmployeeFormState>(initialFormData);

  const [profilePhoto, setProfilePhoto] =
    useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof EmployeeFormState, string>>
  >({});
  useEffect(() => {
  dispatch(getAllRolesThunk());
}, [dispatch]);
useEffect(() => {
  dispatch(getAllDepartmentsThunk({
      page: 1,
      limit: 100,
    }));
}, [dispatch]);
  const { isLoading } = useAppSelector(
    (state) => state.employee,
  );
  useEffect(() => {
  if (!formData.departmentId) return;

  dispatch(
    getCategoriesByDepartmentThunk({
      departmentId: formData.departmentId,
      page: 1,
      limit: 100,
    }),
  );
}, [dispatch, formData.departmentId]);

  const departments = useAppSelector(
    (state) => state.department.departments,
  );
  const roles = useAppSelector(
    (state) => state.roles.roles,
  );
  
console.log("const departments = useAppSelector(",roles)

  const categories = useAppSelector(
    (state) => state.category.categories,
  );

  const handleChange = (
    field: keyof EmployeeFormState,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

const handleCategoryChange = (categoryId: string) => {
  if (!categoryId) return;

  setFormData((prev) => ({
    ...prev,
    categoryIds: prev.categoryIds.includes(categoryId)
      ? prev.categoryIds
      : [...prev.categoryIds, categoryId],
  }));
};

  const handlePhotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setProfilePhoto(file);
    setPreview(URL.createObjectURL(file));
  };

const validateForm = () => {
  const result = employeeSchema.safeParse(formData);

  if (result.success) {
    setErrors({});
    return true;
  }

  const newErrors: Partial<
    Record<keyof EmployeeFormState, string>
  > = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof EmployeeFormState;

    if (!newErrors[field]) {
      newErrors[field] = issue.message;
    }
  });

  setErrors(newErrors);
  return false;
};

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const payload: CreateEmployeePayload = {
      ...formData,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
     
      profilePhoto: null,
    };

    try {
      await dispatch(createEmployeeThunk(payload)).unwrap();
      navigate("/company-admin/employee-management");
      toast.success("Employee invitation send  Successfully")
    } catch(error) {
      toast.error(
      typeof error === "string"
        ? error
        : "Something went wrong"
    );
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100";

  const labelClass =
    "text-sm font-medium text-slate-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6"
    >
      {/* Personal Information */}
      <section>
        <h2 className="text-base font-semibold text-slate-800">
          Personal Information
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>First Name *</label>
            <input
              value={formData.firstName}
              onChange={(e) =>
                handleChange("firstName", e.target.value)
              }
              placeholder="Enter first name"
              className={inputClass}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Last Name *</label>
            <input
              value={formData.lastName}
              onChange={(e) =>
                handleChange("lastName", e.target.value)
              }
              placeholder="Enter last name"
              className={inputClass}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {errors.lastName}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              placeholder="employee@example.com"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              placeholder="Enter phone number"
              className={inputClass}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="border-t border-slate-100" />

      {/* Work Information */}
      <section>
        <h2 className="text-base font-semibold text-slate-800">
          Work Information
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
       

     

          <div>
            <label className={labelClass}>Department *</label>
            <select
              value={formData.departmentId}
              onChange={(e) => {
                handleChange("departmentId", e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  roleId: "",
                  categoryIds: [],
                }));
              }}
              className={inputClass}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.departmentId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.departmentId}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Role *</label>
            <select
              value={formData.roleId}
              onChange={(e) =>
                handleChange("roleId", e.target.value)
              }
              className={inputClass}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="mt-1 text-xs text-red-500">
                {errors.roleId}
              </p>
            )}
          </div>
      {/* Categories */}
<section>
  <h2 className="text-base font-semibold text-slate-800">
    Assigned Categories
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Select the categories this employee can handle.
  </p>

  <div className="mt-4">
    <label className={labelClass}>Select Category</label>

    <select
      value=""
      disabled={!formData.departmentId}
      onChange={(e) => handleCategoryChange(e.target.value)}
      className={inputClass}
    >
      <option value="">
        {formData.departmentId
          ? "Choose a category"
          : "Select Department First"}
      </option>

      {categories
        .filter(
          (category) =>
            !formData.categoryIds.includes(category.id),
        )
        .map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </select>
  </div>

  {/* Selected Categories */}
  {formData.categoryIds.length > 0 && (
    <div className="mt-4">
      <p className="mb-2 text-sm font-medium text-slate-700">
        Selected Categories
      </p>

      <div className="flex flex-wrap gap-2">
        {formData.categoryIds.map((categoryId) => {
          const category = categories.find(
            (item) => item.id === categoryId,
          );

          if (!category) return null;

          return (
            <span
              key={categoryId}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm font-medium text-[#7C3AED]"
            >
              {category.name}

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryIds: prev.categoryIds.filter(
                      (id) => id !== categoryId,
                    ),
                  }))
                }
                className="hover:text-red-600"
              >
                <X size={14} />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  )}
</section>
               <div>
            <label className={labelClass}>Joining Date *</label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) =>
                handleChange("joiningDate", e.target.value)
              }
              className={inputClass}
            />
            {errors.joiningDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.joiningDate}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="border-t border-slate-100" />



      <div className="border-t border-slate-100" />

      {/* Profile Photo */}
      <section>
        <h2 className="text-base font-semibold text-slate-800">
          Profile Photo
        </h2>

        <div className="mt-4 flex items-center gap-4">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Profile preview"
                className="h-16 w-16 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setProfilePhoto(null);
                  setPreview(null);
                }}
                className="absolute -right-1 -top-1 rounded-full bg-red-500 p-1 text-white"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-[#7C3AED]">
              <Upload size={22} />
            </div>
          )}

          <label className="cursor-pointer">
            <span className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Upload Photo
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

          <p className="text-xs text-slate-400">
            Optional image upload
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating..." : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

