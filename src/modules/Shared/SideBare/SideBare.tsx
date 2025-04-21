import { useContext, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavLink, useNavigate } from "react-router-dom";

import userIcons from '../../../assets/people-icon.png';
import homeIcon from '../../../assets/home-icon.png';
import tasksIcon from '../../../assets/tasks-icon.png';
import projectsIcon from '../../../assets/projects-icon.png';

import { AuthContext } from "../../../context/AuthContext";

export default function SideBare() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    if (window.innerWidth >= 768) {
      setIsCollapsed(prev => !prev);
    }
  };

  const { loginData } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth <= 768);
    handleResize(); // initial run
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`sidebar-container vh-100 position-sticky top-0 bottom-0 ${isCollapsed ? 'collapsed' : ''}`}>
    <Sidebar collapsed={isCollapsed} className="border-0">
      <Menu
      
        menuItemStyles={{
          button: {
            '&.active': {
              backgroundColor: 'rgba(239, 155, 40, 0.3)',
              color: 'rgba(239, 155, 40, 1)',
            },
          },
        }}
      >
        <MenuItem
          className=" mx-1 pb-4 sideli"
          onClick={toggleCollapse} icon={ <i className={`fas ms-2 ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left' } text-white cursor-pointer`}></i>} />
  
        <MenuItem className="mt-4" component={<NavLink to="/dashboard" end />}icon={<img src={homeIcon} alt="homeicon" />}>Home</MenuItem>
  
     {loginData?.userGroup==='Employee'?'':<MenuItem component={<NavLink to="/dashboard/users" />} icon={<img src={userIcons} alt="usersicon" />}>Users</MenuItem>}   
  
        <MenuItem component={<NavLink to="/dashboard/projects" />} icon={<img src={projectsIcon} alt="projectsicon" />}>Projects</MenuItem>
  
        <MenuItem component={<NavLink to={loginData?.userGroup === 'Manager'? '/dashboard/tasks': '/dashboard/employee-tasks'}/>} 
        icon={<img src={tasksIcon} alt="tasksicon" />}>Tasks </MenuItem>
      </Menu>
    </Sidebar>
  </div>
  
  );
}
