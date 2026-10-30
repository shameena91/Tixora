import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import type { RoleListItem, RoleStatus } from "../../types/roles/RoleUI";

import RolePageHeader from "../../componenets/rolesAndPermissions/RolePageHeader";
// import RoleFilters from "../../componenets/rolesAndPermissions/RoleFilters";
import RoleTable from "../../componenets/rolesAndPermissions/RoleTable";
import RoleStatsCards from "../../componenets/rolesAndPermissions/RoleStatsCards";

import {
  getAllRolesThunk,
  updateRoleStatusThunk,
} from "../../../../redux/slices/roles/roleThunk";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

function RolesManagementPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { roles, isFetching, fetchError } = useAppSelector(
    (state) => state.roles,
  );

  // const [search, setSearch] = useState("");
  // const [status, setStatus] = useState("ALL");

  // Fetch all roles when page loads
  useEffect(() => {
    dispatch(getAllRolesThunk());
  }, [dispatch]);

  // Search and filter

  // Create Role
  const handleCreate = () => {
    navigate("/company-admin/roles-management/create");
  };

  // View Role
  const handleView = (role: RoleListItem) => {
    navigate(`/company-admin/roles-management/${role.id}`);
  };

  // Edit Role
  const handleEdit = (role: RoleListItem) => {
    navigate(`/company-admin/roles/${role.id}/edit`);
  };

  // Activate / Deactivate Role
  const handleToggleStatus = async (role: RoleListItem) => {
    const roleStatus: RoleStatus =
      role.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      await dispatch(
        updateRoleStatusThunk({
          roleId: role.id,
          roleStatus,
        }),
      ).unwrap();
    } catch {
      // Error is already stored in Redux state.
    }
  };

  return (
    <div className="space-y-6 p-6">
      <RolePageHeader onCreate={handleCreate} />

      <RoleStatsCards roles={roles} />

      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">All Roles</h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your company's roles.
          </p>
        </div>

        {/* <RoleFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        /> */}

        {isFetching ? (
          <div className="py-12 text-center text-sm text-slate-500">
            Loading roles...
          </div>
        ) : fetchError ? (
          <div className="py-12 text-center text-sm text-red-500">
            {fetchError}
          </div>
        ) : (
          <RoleTable
            roles={roles}
            onView={handleView}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
    </div>
  );
}

export default RolesManagementPage;
