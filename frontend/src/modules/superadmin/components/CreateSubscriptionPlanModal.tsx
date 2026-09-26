
import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { X } from "lucide-react";

import createSubscriptionPlanValidationSchema from "../schema/CreateSubscriptionPlanModal";
import type { SubscriptionPlanDetails } from "../../../redux/slices/subscriptionPlanSlice";

export type CreateSubscriptionPlanFormData = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
};

interface CreateSubscriptionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: SubscriptionPlanDetails | null;
  planNames: string[];
  onSubmit: (data: CreateSubscriptionPlanFormData) => void;
}

const initialFormData: CreateSubscriptionPlanFormData = {
  name: "",
  description: "",
  monthlyPrice: 0,
  yearlyPrice: 0,

  memberLimit: 0,
  companyAdminLimit: 0,
  departmentLimit: 0,
  ticketLimit: 0,

  automaticTicketAssignment: false,
  slaManagement: false,
};

const getInitialFormData = (
  plan?: SubscriptionPlanDetails | null
): CreateSubscriptionPlanFormData => {
  if (!plan) {
    return initialFormData;
  }

  return {
    name: plan.name,
    description: plan.description,
    monthlyPrice: plan.monthlyPrice,
    yearlyPrice: plan.yearlyPrice,
    memberLimit: plan.memberLimit,
    companyAdminLimit: plan.companyAdminLimit,
    departmentLimit: plan.departmentLimit,
    ticketLimit: plan.ticketLimit,
    automaticTicketAssignment:
      plan.automaticTicketAssignment,
    slaManagement: plan.slaManagement,
  };
};

const CreateSubscriptionPlanModal = ({
  isOpen,
  onClose,
  plan,
  planNames,
  onSubmit,
}: CreateSubscriptionPlanModalProps) => {
  const [formData, setFormData] =
    useState<CreateSubscriptionPlanFormData>(() =>
      getInitialFormData(plan)
    );

  const [errors, setErrors] = useState<
    Partial<
      Record<keyof CreateSubscriptionPlanFormData, string>
    >
  >({});

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };
  

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const { name, value, type } = event.target;

    // Plan name change
    if (name === "name") {
      const isEnterprise = value === "ENTERPRISE";

      setFormData((prev) => ({
        ...prev,
        name: value,

        memberLimit: isEnterprise
          ? null
          : prev.memberLimit ?? 0,

        companyAdminLimit: isEnterprise
          ? null
          : prev.companyAdminLimit ?? 0,

        departmentLimit: isEnterprise
          ? null
          : prev.departmentLimit ?? 0,

        ticketLimit: isEnterprise
          ? null
          : prev.ticketLimit ?? 0,
      }));

      setErrors((prev) => ({
        ...prev,
        name: "",
        memberLimit: "",
        companyAdminLimit: "",
        departmentLimit: "",
        ticketLimit: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : type === "number"
            ? Number(value)
            : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const result =
      createSubscriptionPlanValidationSchema.safeParse(
        formData
      );

    if (!result.success) {
      const validationErrors: Partial<
        Record<keyof CreateSubscriptionPlanFormData, string>
      > = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (
          typeof fieldName === "string" &&
          fieldName in formData &&
          !validationErrors[
            fieldName as keyof CreateSubscriptionPlanFormData
          ]
        ) {
          validationErrors[
            fieldName as keyof CreateSubscriptionPlanFormData
          ] = issue.message;
        }
      });

      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  if (!isOpen) {
    return null;
  }

  const isEnterprise =
    formData.name === "ENTERPRISE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Create Subscription Plan
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add a new pricing plan for Tixora
              companies.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5"
        >
          {/* Plan Name + Description */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Plan Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Plan Name
              </label>

              <select
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              >
                <option value="">
                  Select Plan
                </option>

                {planNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="For growing teams"
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                  errors.description
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Monthly Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Monthly Price (₹)
              </label>

              <input
                type="number"
                name="monthlyPrice"
                value={formData.monthlyPrice}
                onChange={handleInputChange}
                 onFocus={(event) => event.currentTarget.select()}
                min="0"
                placeholder="1999"
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                  errors.monthlyPrice
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />

              {errors.monthlyPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.monthlyPrice}
                </p>
              )}
            </div>

            {/* Yearly Price */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Yearly Price (₹)
              </label>

              <input
                type="number"
                name="yearlyPrice"
                value={formData.yearlyPrice}
                onChange={handleInputChange}
                 onFocus={(event) => event.currentTarget.select()}
                min="0"
                placeholder="19990"
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                  errors.yearlyPrice
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                }`}
              />

              {errors.yearlyPrice && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.yearlyPrice}
                </p>
              )}
            </div>
          </div>

          {/* Plan Limits */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Plan Limits
            </p>

            {isEnterprise ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Members */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="text-xs font-medium text-gray-500">
                    Members
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Unlimited
                  </p>
                </div>

                {/* Company Admins */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="text-xs font-medium text-gray-500">
                    Company Admins
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Unlimited
                  </p>
                </div>

                {/* Departments */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="text-xs font-medium text-gray-500">
                    Departments
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Unlimited
                  </p>
                </div>

                {/* Tickets */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3">
                  <p className="text-xs font-medium text-gray-500">
                    Tickets / Month
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    Unlimited
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Members */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Members
                  </label>

                  <input
                    type="number"
                    name="memberLimit"
                    value={formData.memberLimit ?? ""}
                    onChange={handleInputChange}
                     onFocus={(event) => event.currentTarget.select()}
                    min="0"
                    placeholder="10"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                      errors.memberLimit
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                  />

                  {errors.memberLimit && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.memberLimit}
                    </p>
                  )}
                </div>

                {/* Company Admins */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Company Admins
                  </label>

                  <input
                    type="number"
                    name="companyAdminLimit"
                    value={
                      formData.companyAdminLimit ?? ""
                    }
                    onChange={handleInputChange}
                     onFocus={(event) => event.currentTarget.select()}
                    min="0"
                    placeholder="1"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                      errors.companyAdminLimit
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                  />

                  {errors.companyAdminLimit && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.companyAdminLimit}
                    </p>
                  )}
                </div>

                {/* Departments */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Departments
                  </label>

                  <input
                    type="number"
                    name="departmentLimit"
                    value={
                      formData.departmentLimit ?? ""
                    }
                    onChange={handleInputChange}
                     onFocus={(event) => event.currentTarget.select()}
                    min="0"
                    placeholder="2"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                      errors.departmentLimit
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                  />

                  {errors.departmentLimit && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.departmentLimit}
                    </p>
                  )}
                </div>

                {/* Tickets */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    Tickets / Month
                  </label>

                  <input
                    type="number"
                    name="ticketLimit"
                    value={formData.ticketLimit ?? ""}
                    onChange={handleInputChange}
                     onFocus={(event) => event.currentTarget.select()}
                    min="0"
                    placeholder="100"
                    className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
                      errors.ticketLimit
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20"
                    }`}
                  />

                  {errors.ticketLimit && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.ticketLimit}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-900">
              Features
            </p>

            {/* Automatic Ticket Assignment */}
            <label className="flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="automaticTicketAssignment"
                checked={
                  formData.automaticTicketAssignment
                }
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span>
                Automatic Ticket Assignment
              </span>
            </label>

            {/* SLA Management */}
            <label className="flex items-center gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="slaManagement"
                checked={formData.slaManagement}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />

              <span>SLA Management</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
             
              className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
            
            >
              {plan ? "Update Plan" : "Save Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionPlanModal;

