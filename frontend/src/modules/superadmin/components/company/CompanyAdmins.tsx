import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

import {
  fetchCompanyAdminThunk,
  type CompanyAdminList,
  type CompanyDetails,
} from "../../../../redux/slices/companySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";
import DetailsDrawer from "../../../../components/common/DetailsDrawer";

interface CompanyAdminsProps {
  company: CompanyDetails;
}

const CompanyAdmins = ({
  company,
}: CompanyAdminsProps) => {
  const dispatch = useAppDispatch();

  const [showAdminDrawer, setShowAdminDrawer] =
    useState(false);

  useEffect(() => {
    if (company.id) {
      dispatch(
        fetchCompanyAdminThunk(company.id),
      );
    }
  }, [dispatch, company.id]);

  const {
    companyAdminList,
    companyAdminError,
    companyAdminLoading,
  } = useAppSelector(
    (state) => state.company,
  );

  console.log(
    "companyAdminList",
    companyAdminList,
  );

  const companyAdminColumns: DataTableColumn<CompanyAdminList>[] =
    [
      {
        header: "Name",
        accessor: "firstName",
        render: (value, row) =>
          `${String(value)} ${row.lastName}`,
      },

      {
        header: "Phone",
        accessor: "phone",
      },

      {
        header: "Email",
        accessor: "email",
      },

      {
        header: "Designation",
        accessor: "designation",
      },

      {
        header: "Status",
        accessor: "status",
        render: (value) => (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
              String(value) === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {String(value)}
          </span>
        ),
      },

      {
        header: "Action",
        accessor: "id",
        render: () => (
          <button
            type="button"
            onClick={() =>
              setShowAdminDrawer(true)
            }
            className="text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9]"
          >
            View
          </button>
        ),
      },
    ];

  if (companyAdminLoading) {
    return (
      <div className="flex justify-center p-6">
        <p className="text-sm text-gray-500">
          Loading company admin...
        </p>
      </div>
    );
  }

  if (companyAdminError) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">
          {companyAdminError}
        </p>
      </div>
    );
  }

  if (!companyAdminList) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Mail
          size={36}
          className="mb-3 text-gray-400"
        />

        <p className="text-sm font-medium text-gray-700">
          No company admin found
        </p>

        <p className="mt-1 text-xs text-gray-500">
          This company does not have any admin.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable
        data={[companyAdminList]}
        columns={companyAdminColumns}
      />

      <DetailsDrawer
        open={showAdminDrawer}
        title="Admin Details"
        onClose={() =>
          setShowAdminDrawer(false)
        }
      >
        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Name
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {companyAdminList.firstName}{" "}
              {companyAdminList.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Email
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {companyAdminList.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Phone
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {companyAdminList.phone}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Designation
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {companyAdminList.designation}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Status
            </p>

            <div className="mt-1">
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  companyAdminList.status ===
                  "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {companyAdminList.status}
              </span>
            </div>
          </div>
        </div>
      </DetailsDrawer>
    </div>
  );
};

export default CompanyAdmins;