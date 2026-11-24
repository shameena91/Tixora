import { useContext } from "react";

import { EmployeeAuthContext } from "../../modules/employee/context/EmployeeAuthContext";


export const useAuth = () => {
  const context = useContext(EmployeeAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};