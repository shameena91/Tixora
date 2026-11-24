
import { useState } from "react";
import { EmployeeAuthContext } from "./EmployeeAuthContext";
import type { UserRole } from "../../auth/types/auth.types";

export const EmployeeAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isInitializing] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [employeeRole, setEmployeeRole] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);

  return (
    <EmployeeAuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userName,
        setUserName,
        isInitializing,
        role,
        setRole,
        employeeRole,
        setEmployeeRole,
        companyId,
        setCompanyId,
        permissions,
        setPermissions,
      }}
    >
      {children}
    </EmployeeAuthContext.Provider>
  );
};
