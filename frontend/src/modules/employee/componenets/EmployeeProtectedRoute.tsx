
import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../../auth/types/auth.types";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";


const EmployeeProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const {
    accessToken,
    isInitializing,
    role,
  } = useEmployeeAuth();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (!accessToken || role !== "EMPLOYEE") {
    return <Navigate to="/employee-login" replace />;
  }

  return <>{children}</>;
};

export default EmployeeProtectedRoute;
