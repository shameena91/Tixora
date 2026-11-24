import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAdminAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useEmployeeAuth must be used inside EmployeeAuthProvider"
    );
  }

  return context;
};