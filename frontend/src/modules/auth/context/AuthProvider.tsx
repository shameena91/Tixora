
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { refreshAdminAccessToken } from "../services/authService";
import type { UserRole } from "../types/auth.types";
import { storeAccessToken } from "../api/tokenStorage";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  // // Employee details
  // const [employeeRole, setEmployeeRole] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  // const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await refreshAdminAccessToken();
        const data = response.data;
console.log("REFRESH RESPONSE:", response.data);
        setAccessToken(data.accessToken);
        storeAccessToken(data.accessToken);
        setUserName(data.name);
        setRole(data.role);

        // // Restore employee details
        // setEmployeeRole(data.employeeRole ?? null);
        setCompanyId(data.companyId ?? null);
        // setPermissions(data.permissions ?? []);

      } catch (error) {
        console.log("No active session", error);
      } finally {
        setIsInitializing(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userName,
        setUserName,
        isInitializing,
        role,
        setRole,

        // employeeRole,
        // setEmployeeRole,
        companyId,
        setCompanyId,
        // permissions,
        // setPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
