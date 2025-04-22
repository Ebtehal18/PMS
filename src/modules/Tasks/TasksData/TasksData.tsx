import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ITasksData } from "../../Shared/interfaces/TaskInterface";
import { Project_Desc_Validation, Project_Id_Validation, Project_Title_Validation, User_Id_Validation } from "../../../services/Validation";
import { axiosPrivateInstance } from "../../../services/api/apiInstance";
import { PROJECTS_URLS, TASKS_URLS, USERS_URLS } from "../../../services/api/apiConfig";

import { toast } from "react-toastify";
import { IUsers } from "../../Shared/interfaces/UserInterface";
import { ProjectInterface } from "../../Shared/interfaces/ProjectInterface";

export default function TasksData() {
  const {taskId}=useParams<{ taskId: string }>()
  const EditTaskId=Number(taskId)
  console.log(taskId)
  const navigate=useNavigate()
  const [loadingEdit,setLoadingEdit]=useState(EditTaskId?true:false)
 
  const [users,setUsers]=useState<IUsers[]>([])
  const [projects,setProjects]=useState<ProjectInterface[]>([])

const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm<ITasksData>()


const onSubmit=async(values:ITasksData)=>{
  console.log(values)
  try {
    const {data}=EditTaskId?
    await axiosPrivateInstance.put(TASKS_URLS.UPDATE_TASK(EditTaskId),values)
    :await axiosPrivateInstance.post(TASKS_URLS.CREAT_TASK,values)
    console.log(data)
    toast.success(taskId?'You Have Updated The Task Successfully!':'New Task has been added successfully!')
    navigate("/dashboard/tasks")
  } catch (error) {
    console.log(error)
  }
}
const getAllProjects=async(pageSize:number,pageNumber:number)=>{
try {
  const {data}=await axiosPrivateInstance.get(PROJECTS_URLS.GET_PROJECTS_FOR_MANAGER,{
    params:{
      pageSize,
      pageNumber
    }
  })
  setProjects(data?.data)
} catch (error) {
  console.log(error)
}
}
const getAllUsers=async(pageSize:number,pageNumber:number)=>{
try {
  const {data}=await axiosPrivateInstance.get(USERS_URLS.GET_ALL_USERS,{
    params:{
      pageSize,
      pageNumber
    }
  })
  setUsers(data?.data)
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
(async()=>{
 await getAllProjects(10000,1)
 await getAllUsers(10000,1)
 if(EditTaskId){
  const getTaskBYId=async()=>{
    setLoadingEdit(true)
    try {
      const {data}=await axiosPrivateInstance.get(TASKS_URLS.GET_TASK(EditTaskId))
      setValue('title',data.title)
      console.log(data)
      setValue('description',data.description)
      setValue('employeeId',data.employee.id)
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingEdit(false)
    }
    }
    getTaskBYId()
 }
})()

},[])
  return <>
    <div className="main">
  <div className="header d-flex flex-column px-3 py-4">
  <Link className="py-2 ps-4 text-decoration-none text-black" to={'/dashboard/tasks'} >   <i className="fa-solid fa-angle-left pe-2 "></i>  Veiw All Projects</Link>
  <h2 > Add a New Task</h2>
  </div>
  </div>

  <Container>
    <Row className="justify-content-center d-flex mt-5">
      <Col md={8}>
      <div className="project-data p-md-5 p-3 d-flex flex-column">
      {loadingEdit?<Loading/>:<form onSubmit={handleSubmit(onSubmit)}>
<Form.Group>
          <Form.Label htmlFor="title" className="main-color">Title</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="title"
              type="text"
              placeholder="Name"
              aria-label="Title"
              aria-describedby="basic-addon1"
              {...register('title',Project_Title_Validation)}
              
            />
          </InputGroup>
          {errors.title&&<p className="text-danger">*{errors.title.message}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="Description" className="main-color">Description</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
            as="textarea"
              id="Description"
              type="text"
              placeholder="Description"
              aria-label="Title"
              aria-describedby="basic-addon1"
              {...register('description',Project_Desc_Validation)}
              
            />
          </InputGroup>
          {errors.description&&<p className="text-danger">*{errors.description.message}</p>}
        </Form.Group>

<Row className="d-flex justify-content-between ">
<Col md={6}>
<div>
<Form.Label htmlFor="user" className="main-color">User</Form.Label>
<Form.Select aria-label="Default select example"{...register('employeeId',User_Id_Validation)}>

      <option value={''}>User</option>
      {users.map((user)=><option key={user.id} value={user.id}>{user.userName}</option>)}
   
    </Form.Select>
    {errors.employeeId&&<p className="text-danger">*{errors.employeeId.message}</p>}
</div>
</Col>
<Col md={6}>
<div><Form.Label htmlFor="project" className="main-color">Project</Form.Label>
<Form.Select aria-label="Default select example" disabled={EditTaskId?true:false} {...(!EditTaskId && register('projectId', Project_Id_Validation))}>
      <option value={''}>Project</option>
      {projects.map((project)=><option key={project.id} value={project.id}>{project.title}</option>)}
  
    </Form.Select></div>
    {errors.projectId&& !EditTaskId&&<p className="text-danger">*{errors.projectId.message}</p>}
</Col>
</Row>

        <div className="btns mt-3 d-flex justify-content-between">
          <Link className="btn btn-cancel rounded-pill d-flex justify-content-center align-items-center py-2 px-3"to={'/dashboard/tasks'}>Cancel</Link>
        {EditTaskId?  <button className="btn btn-save rounded-pill text-white py-2 px-3">
            {isSubmitting?<>
            <span>Editing...</span>
            <i className="fas fa-spinner fa-spin"></i>

            </>:'Edit'}
          </button>:  <button className="btn btn-save rounded-pill text-white py-2 px-3">
            {isSubmitting?<>
            <span>Saving...</span>
            <i className="fas fa-spinner fa-spin"></i>

            </>:'Save'}
          </button>}
        </div>
</form>}

      </div>
      </Col>
    </Row>
  </Container>

  </>;
}
