import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Header({title,to,link}:{title:string,to?:string,link?:string}) {
  const {loginData}=useContext(AuthContext)
  return <>
   <div className="header d-flex justify-content-between px-md-3 py-4 flex-column flex-md-row align-items-center">
 <h2 className="py-2 ps-md-5">{title}</h2>
{loginData?.userGroup==='Manager' &&to? <Link to={to} className="btn-add rounded-pill text-white py-2 ">{link}</Link>:""}
 </div>
  </>;
}
