
import { createContext } from "react";
import type { UserRole } from "../../auth/types/auth.types";



export interface EmployeeAuthContextType {
  accessToken: string | null;
  userName: string | null;
  isInitializing: boolean;

  role: UserRole | null;
  employeeRole: string | null;
  companyId: string | null;
  permissions: string[];

  setRole: (role: UserRole | null) => void;
  setAccessToken: (token: string | null) => void;
  setUserName: (name: string | null) => void;
  setEmployeeRole: (role: string | null) => void;
  setCompanyId: (id: string | null) => void;
  setPermissions: (permissions: string[]) => void;
}


export const EmployeeAuthContext =
  createContext<EmployeeAuthContextType | null>(null);
