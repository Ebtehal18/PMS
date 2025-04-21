import  { useContext  } from "react";
import {  Link, useNavigate  } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { imgURL } from "../../../services/api/apiInstance";
import { Dropdown } from "react-bootstrap";
import { DarkModeContext } from "../../../context/DarkMode";


import personalimg from '../../../assets/register-img.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logoNav from '../../../assets/nav-logo.png'
import logoLight from '../../../assets/logo.png';

export default function Navbare() {

  const navigate=useNavigate()
const {currentUser,loginData,logOut}=useContext(AuthContext)
const {toggleMode,mode}=useContext(DarkModeContext)
 



return  <Navbar expand="lg" >
<Container>
  <Navbar.Brand ><Link to={'/dashboard'}><img width={166} src= {mode==='light'? logoNav:logoLight} alt="logo" /></Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ms-auto d-flex flex-row align-items-center justify-content-between">

      <Nav.Link onClick={toggleMode}>

      <i className={`fa-solid  ${mode==='light'?'text-warning fa-sun':"text-white fa-moon"} toggle-mode `}></i>
      </Nav.Link>
      <Nav.Link  className="d-flex align-items-center ">
        <img 
        src={
          loginData?.userGroup === "Manager"
        ? personalimg 
        : currentUser?.imagePath
        ? `${imgURL}/${currentUser.imagePath}`
        : personalimg 
        }
         alt="personal-img" width={40} />
        <div className="mx-2">
          <h6 className="mb-0 ">{currentUser?.userName}</h6>
          <p className="mb-0">{currentUser?.email}</p>
        </div>
      </Nav.Link>
    
    <Nav.Link>
    <Dropdown>
      <Dropdown.Toggle className="nav-toggle" id="dropdown-basic">
      <i className={`fa-solid fa-angle-down ${mode==='light'?'text-muted':"text-white"} ms-3`}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* <Dropdown.Item><Link to={'/dashboard/profile'} className="text-black text-decoration-none"> Profile</Link></Dropdown.Item> */}
        <Dropdown.Item><Link to={'/change-password'} className="text-black text-decoration-none"> Change Password</Link></Dropdown.Item>
        <Dropdown.Item onClick={()=>logOut(navigate)}>Logo out</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
    </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>


  
}