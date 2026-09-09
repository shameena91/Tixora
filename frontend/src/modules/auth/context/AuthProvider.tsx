import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { refreshAccessToken } from "../services/authService"
// import { storeAccessToken } from "../api/tokenStorage"
import type { UserRole } from "../types/auth.types";
import { storeAccessToken } from "../api/tokenStorage";

export const AuthProvider=({children}:{children:React.ReactNode})=>{


    const [accessToken,setAccessToken]=useState<string|null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [isInitializing, setIsInitializing] = useState(true);
const [role, setRole] = useState<UserRole | null>(null);
    useEffect(()=>{
        const restoreSession=async()=>{
            try {
                const response=await refreshAccessToken()
                setAccessToken(response.data.accessToken)
                storeAccessToken(response.data.accessToken);
                 setUserName(response.data.name);
        setRole(response.data.role);
                
            } catch (error) {
                
                console.log("No active session",error)
            }finally {
      setIsInitializing(false);
    }
        }
        restoreSession()
    },[])
    return (
        <AuthContext.Provider
        value={{accessToken,
            setAccessToken,isInitializing
            ,userName,
        setUserName, role,
        setRole,}}>{children}</AuthContext.Provider>
    )
}