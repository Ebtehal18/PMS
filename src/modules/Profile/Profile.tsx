import { useContext, useEffect } from "react";
import Header from "../Shared/Header/Header";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const {getCurrentUser}=useContext(AuthContext)
  
  useEffect(()=>{
    getCurrentUser()
  },[])
  return <div className="main">
    <Header title={'My Profile'}/>
  </div>;
}
