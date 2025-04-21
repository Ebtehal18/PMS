import { jwtDecode } from "jwt-decode";
import  { createContext,  ReactNode,  useEffect, useState } from "react";
import { axiosPrivateInstance } from "../services/api/apiInstance";
import { USERS_URLS } from "../services/api/apiConfig";
import { ILoginData, IUser } from "../modules/Shared/interfaces/AuthInterface";
import { NavigateFunction, useNavigate } from "react-router-dom";
// import { USERS_URLS } from "../Services/Urls";
// import { privateAxiosInstance } from "../Services/Axiosinstanc";
// import { ILoginData, IUser } from "../Modules/Shared/Interfaces/AuthInterface";



export const AuthContext= createContext<any>(null)
export default function AuthContextProvider({children} :{children:ReactNode}) {
  const [loginData,setLoginData]=useState<ILoginData|null>(null)  
  const [currentUser,setCurrentUser]=useState<IUser|null>(null)


 const fillLoginData=()=>{
  const token=localStorage.getItem('token');
  if(token){
    const decoded = jwtDecode<ILoginData>(token);
    setLoginData(decoded)

  }
 }

 const logOut=(navigate:NavigateFunction)=>{
  localStorage.removeItem('token')
  navigate('/login')
}
 const getCurrentUser=async()=>{
  try {
    const {data}=await axiosPrivateInstance.get(USERS_URLS.GET_CURRENT_USER)
    console.log(data)
    setCurrentUser(data)
  } catch (error) {
    console.log(error)
  }
}



useEffect(() => {
  // to handel referesh the page in case we logedin 

  if(localStorage.getItem('token')) {
    fillLoginData()
    getCurrentUser()
  } 

}, []);
  return <AuthContext.Provider value={{loginData,fillLoginData,getCurrentUser,currentUser,logOut}}>{children}</AuthContext.Provider>
}