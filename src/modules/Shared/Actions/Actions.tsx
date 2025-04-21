import { Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";
import { IUsers } from "../interfaces/UserInterface";

export default function Actions({user,handleShow,handleProjectDelete,handleShowDeleteUser,projectId,isActivated,taskId,handleShowDeleteTaskist}:{
    user?:IUsers,
    projectId?:number,
    handleShow?:(id:number)=>void,

    handleShowDeleteUser?:(user:{id:number,isActivated:boolean})=>void;
    taskId?:number,
    handleShowDeleteTaskist?:(id:number)=>void,

    handleUserDelete?: (user:{id:number,isActivated:boolean}) => void;
    handleProjectDelete?: (id: number) => void;
    isActivated?:boolean
}) {
 
    
  return <><Dropdown >
  <Dropdown.Toggle id="dropdown-basic" variant="link" className="text-decoration-none">
  <i className="fa-solid fa-ellipsis-vertical text-black "></i>
{/* <span className="d-block d-md-none text-decoration-none">Actions</span> */}
  </Dropdown.Toggle>

  <Dropdown.Menu>
   {user &&handleShowDeleteUser &&handleShow&&  <>
    <Dropdown.Item onClick={()=>handleShow(user.id)}><i className="mx-2 text-success fa-regular fa-eye"></i> view</Dropdown.Item>
    <Dropdown.Item onClick={()=>handleShowDeleteUser({id:user.id,isActivated:user.isActivated})}> <i className={`mx-2 fa-solid ${isActivated ? 'fa-ban text-danger' : 'fa-user text-success'}`}></i>
    {isActivated?'block':'activate'}
    </Dropdown.Item>
   </>}

{projectId && handleProjectDelete &&<>
    <Dropdown.Item ><Link to={`/dashboard/edit-project/${projectId}`} className="d-inline-block w-100 text-decoration-none text-black"> <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>Edit</Link></Dropdown.Item>
    <Dropdown.Item onClick={()=>handleProjectDelete(projectId)}><i className="mx-2 text-success fa-solid fa-trash-can"></i>  Delete </Dropdown.Item>
</>}

{taskId&&handleShowDeleteTaskist&& <>
  <Dropdown.Item ><Link to={`/dashboard/edit-task/${taskId}`} className="d-inline-block w-100 text-decoration-none text-black"> <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>Edit</Link></Dropdown.Item>
  <Dropdown.Item onClick={()=>handleShowDeleteTaskist(taskId)}>
  <i className="mx-2 text-success fa-solid fa-trash-can"></i>  Delete
    </Dropdown.Item>
</>}
  </Dropdown.Menu>
</Dropdown></>;
}
