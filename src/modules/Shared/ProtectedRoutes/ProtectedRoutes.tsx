import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../../context/AuthContext"

export default function ProtectedRoutes({ children }: { children: ReactNode }) {
  const {loginData} = useContext(AuthContext);
  
  // Handle case where context or loginData is null
  if (localStorage.getItem('token') || loginData) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}
