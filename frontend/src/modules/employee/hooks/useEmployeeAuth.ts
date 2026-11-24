import { useContext } from "react";
import { EmployeeAuthContext } from "../context/EmployeeAuthContext";

export const useEmployeeAuth = () => {
  const context = useContext(EmployeeAuthContext);

  if (!context) {
    throw new Error(
      "useEmployeeAuth must be used inside EmployeeAuthProvider"
    );
  }

  return context;
};