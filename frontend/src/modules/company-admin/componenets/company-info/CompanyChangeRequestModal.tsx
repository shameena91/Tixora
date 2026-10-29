import {
  useRef,
  useState,
  type FormEvent,
} from "react";

import {
  Plus,
  Trash2,
  X,
} from "lucide-react";

import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";
import { companyChangeRequestSchema } from "../../schemas/companyChangeRequestSchema";

const companyFields = [
  { label: "Company Name", value: "companyName" },
  { label: "Registration Number", value: "registrationNumber" },
  { label: "Company Type", value: "companyType" },
  { label: "Employee Range", value: "employeeRange" },
  { label: "Address", value: "address" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
  { label: "Country", value: "country" },
  { label: "Postal Code", value: "postalCode" },
] as const;

type CompanyChangeField =
  (typeof companyFields)[number]["value"];

interface ChangeRow {
  id: number;
  field: CompanyChangeField | "";
  newValue: string;
  reason: string;
}

export interface CompanyChangeRequestPayload {
  profileChanges: {
    field: CompanyChangeField;
    newValue: string;
    reason: string;
  }[];
}

interface CompanyChangeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyDetails;
  companyTypes: string[];
  employeeRanges: string[];
  optionsLoading?: boolean;
  onSubmit?: (payload: CompanyChangeRequestPayload) => void;
}

const isCompanyChangeField = (
  value: string,
): value is CompanyChangeField =>
  companyFields.some((item) => item.value === value);

const getCurrentValue = (
  company: CompanyDetails,
  field: CompanyChangeField | "",
): string => {
  switch (field) {
    case "companyName":
      return company.companyName ?? "";

    case "registrationNumber":
      return company.registrationNumber ?? "";

    case "companyType":
      return company.companyType == null
        ? ""
        : String(company.companyType);

    case "employeeRange":
      return company.numberOfEmployees == null
        ? ""
        : String(company.numberOfEmployees);

    case "address":
      return company.location?.address ?? "";

    case "city":
      return company.location?.city ?? "";

    case "state":
      return company.location?.state ?? "";

    case "country":
      return company.location?.country ?? "";

    case "postalCode":
      return company.location?.postalCode ?? "";

    default:
      return "";
  }
};

const getFieldLabel = (
  field: CompanyChangeField | "",
): string =>
  companyFields.find((item) => item.value === field)?.label ??
  "Select field";

const CompanyChangeRequestModal = ({
  isOpen,
  onClose,
  company,
  companyTypes,
  employeeRanges,
  optionsLoading = false,
  onSubmit,
}: CompanyChangeRequestModalProps) => {
  const nextRowId = useRef(2);

  const [rows, setRows] = useState<ChangeRow[]>([
    {
      id: 1,
      field: "",
      newValue: "",
      reason: "",
    },
  ]);

  const [rowErrors, setRowErrors] = useState<
    Record<number, string>
  >({});

  const handleFieldChange = (
    rowId: number,
    field: CompanyChangeField | "",
  ) => {
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              field,
              newValue: "",
              reason: "",
            }
          : row,
      ),
    );

    setRowErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[rowId];
      return updatedErrors;
    });
  };

  const handleNewValueChange = (
    rowId: number,
    newValue: string,
  ) => {
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === rowId
          ? { ...row, newValue }
          : row,
      ),
    );

    setRowErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[rowId];
      return updatedErrors;
    });
  };

  const handleReasonChange = (
    rowId: number,
    reason: string,
  ) => {
    setRows((previousRows) =>
      previousRows.map((row) =>
        row.id === rowId
          ? { ...row, reason }
          : row,
      ),
    );

    setRowErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[rowId];
      return updatedErrors;
    });
  };

  const handleAddField = () => {
    if (rows.length >= companyFields.length) {
      return;
    }

    setRows((previousRows) => [
      ...previousRows,
      {
        id: nextRowId.current++,
        field: "",
        newValue: "",
        reason: "",
      },
    ]);
  };

  const handleRemoveField = (rowId: number) => {
    if (rows.length === 1) {
      return;
    }

    setRows((previousRows) =>
      previousRows.filter((row) => row.id !== rowId),
    );

    setRowErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };
      delete updatedErrors[rowId];
      return updatedErrors;
    });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const result = companyChangeRequestSchema.safeParse({
      changes: rows.map((row) => ({
        field: row.field,
        newValue: row.newValue,
        reason: row.reason,
      })),
    });

    const errors: Record<number, string> = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        if (issue.path[0] !== "changes") {
          return;
        }

        const rowIndex = issue.path[1];

        if (typeof rowIndex !== "number") {
          return;
        }

        const row = rows[rowIndex];

        if (row && !errors[row.id]) {
          errors[row.id] = issue.message;
        }
      });
    }

    if (result.success) {
      const selectedFields = new Set<CompanyChangeField>();

      result.data.changes.forEach((change, index) => {
        const row = rows[index];

        if (!row) {
          return;
        }

        if (selectedFields.has(change.field)) {
          errors[row.id] =
            "This field has already been selected.";
          return;
        }

        selectedFields.add(change.field);

        const oldValue = getCurrentValue(
          company,
          change.field,
        );

        if (
          change.newValue.trim() === oldValue.trim()
        ) {
          errors[row.id] =
            "The new value must be different from the current value.";
        }
      });
    }

    setRowErrors(errors);

    if (!result.success || Object.keys(errors).length > 0) {
      return;
    }

    const payload: CompanyChangeRequestPayload = {
      profileChanges: result.data.changes.map((change) => ({
        field: change.field,
        newValue: change.newValue.trim(),
        reason: change.reason.trim(),
      })),
    };

    onSubmit?.(payload);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-request-title"
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2
              id="change-request-title"
              className="text-xl font-semibold text-slate-900"
            >
              Request Company Information Change
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the fields you want to change and
              provide the new values and reasons.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              {rows.map((row, index) => {
                const availableFields = companyFields.filter(
                  (item) =>
                    item.value === row.field ||
                    !rows.some(
                      (otherRow) =>
                        otherRow.id !== row.id &&
                        otherRow.field === item.value,
                    ),
                );

                const oldValue = getCurrentValue(
                  company,
                  row.field,
                );

                const isDropdownField =
                  row.field === "companyType" ||
                  row.field === "employeeRange";

                const dropdownOptions =
                  row.field === "companyType"
                    ? companyTypes
                    : employeeRanges;

                return (
                  <div
                    key={row.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    {/* Row heading */}

                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Change {index + 1}
                      </h3>

                      {rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveField(row.id)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Field, current value and new value */}

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div>
                        <label
                          htmlFor={`field-${row.id}`}
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Field Name
                        </label>

                        <select
                          id={`field-${row.id}`}
                          value={row.field}
                          onChange={(event) => {
                            const value = event.target.value;

                            handleFieldChange(
                              row.id,
                              value === ""
                                ? ""
                                : isCompanyChangeField(value)
                                  ? value
                                  : "",
                            );
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                          <option value="">Select field</option>

                          {availableFields.map((item) => (
                            <option
                              key={item.value}
                              value={item.value}
                            >
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor={`old-value-${row.id}`}
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Current Value
                        </label>

                        <input
                          id={`old-value-${row.id}`}
                          type="text"
                          value={oldValue || "Not provided"}
                          readOnly
                          className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-3 py-2.5 text-sm text-slate-500 outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`new-value-${row.id}`}
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          New Value
                        </label>

                        {isDropdownField ? (
                          <select
                            id={`new-value-${row.id}`}
                            value={row.newValue}
                            onChange={(event) =>
                              handleNewValueChange(
                                row.id,
                                event.target.value,
                              )
                            }
                            disabled={
                              !row.field || optionsLoading
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-wait disabled:bg-slate-100"
                          >
                            <option value="">
                              {optionsLoading
                                ? "Loading options..."
                                : `Select ${getFieldLabel(row.field)}`}
                            </option>

                            {dropdownOptions.map((option) => (
                              <option
                                key={option}
                                value={option}
                              >
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={`new-value-${row.id}`}
                            type="text"
                            value={row.newValue}
                            onChange={(event) =>
                              handleNewValueChange(
                                row.id,
                                event.target.value,
                              )
                            }
                            disabled={!row.field}
                            placeholder={
                              row.field
                                ? `Enter ${getFieldLabel(row.field).toLowerCase()}`
                                : "Select a field first"
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                          />
                        )}
                      </div>
                    </div>

                    {/* Reason */}

                    <div className="mt-4">
                      <label
                        htmlFor={`reason-${row.id}`}
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                      >
                        Reason for Change
                      </label>

                      <textarea
                        id={`reason-${row.id}`}
                        value={row.reason}
                        onChange={(event) =>
                          handleReasonChange(
                            row.id,
                            event.target.value,
                          )
                        }
                        placeholder="Explain why this information needs to be changed"
                        rows={2}
                        disabled={!row.field}
                        className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                      />
                    </div>

                    {rowErrors[row.id] && (
                      <p className="mt-2 text-xs font-medium text-red-600">
                        {rowErrors[row.id]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add field */}

            <div>
              <button
                type="button"
                onClick={handleAddField}
                disabled={rows.length >= companyFields.length}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                Add Another Field
              </button>

              <p className="mt-2 text-xs text-slate-500">
                Each field can be selected only once.
              </p>
            </div>
          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyChangeRequestModal;