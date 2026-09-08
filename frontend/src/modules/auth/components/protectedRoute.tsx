import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

import  type {ProtectedRouteProps} from "../types/auth.types"
import { Navigate } from "react-router-dom"

const ProtectedRoute=({children}:ProtectedRouteProps)=>{

    const auth=useContext(AuthContext)

    if(!auth)
    {
            throw new Error(
      "ProtectedRoute must be used inside AuthProvider"
    );
    }
     if (auth.isInitializing) {
    return <div>Loading...</div>;
  }
     if (!auth.accessToken) {
    return <Navigate to="/login" replace />;
    
  }
return <>{children}</>;

}
export default ProtectedRoute;