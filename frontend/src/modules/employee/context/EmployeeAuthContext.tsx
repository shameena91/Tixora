
import { createContext } from "react";
import type { EmployeeAuthContextType } from "../types/EmployeeAuthContextType";



export const EmployeeAuthContext =
  createContext<EmployeeAuthContextType | null>(null);
