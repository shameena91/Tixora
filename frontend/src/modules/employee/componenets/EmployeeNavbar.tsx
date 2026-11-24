import { useAuth } from "../../../shared/hooks/useAuth";


interface EmployeeNavbarProps {
  title: string;
}

const EmployeeNavbar = ({ title }: EmployeeNavbarProps) => {
  const { userName, employeeRole } = useAuth();

  const formatRole = (role: string | null) => {
    if (!role) return "Employee";

    return role
      .replace(/[_-]/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-100 bg-white px-4 shadow-sm sm:px-8">
      <h2 className="text-lg font-bold text-[#183B36]">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-[#183B36]">
            {userName}
          </p>

          <p className="text-xs text-gray-500">
            {formatRole(employeeRole)}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF5EE] font-bold text-[#11A675]">
          {userName?.charAt(0).toUpperCase() ?? "E"}
        </div>
      </div>
    </header>
  );
};

export default EmployeeNavbar;
