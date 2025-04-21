


import { Outlet } from "react-router-dom";
import SideBare from "../SideBare/SideBare";
import Navbare from "../Navbar/Navbar";




export default function MasterLayout() {

  
  return<div className="vh-100 ">
  
<Navbare />
  <div className="d-flex  ">
 
 <SideBare/>
 
<div className="w-100 main-content  d-flex flex-column overflow-y-auto ">

 <Outlet/>
 
</div>
  </div>
  </div>
}