import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IProjectData } from "../../Shared/interfaces/ProjectDataInteface";
import { Project_Desc_Validation, Project_Title_Validation } from "../../../services/Validation";
import { axiosPrivateInstance } from "../../../services/api/apiInstance";
import { PROJECTS_URLS } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import  { AxiosError } from "axios";
import Loading from "../../Shared/Loading/Loading";

export default function ProjectsData() {
  const {projectId}=useParams<{ projectId: string }>()
  const EditProjectId=Number(projectId)
  const navigate=useNavigate()
  const [loadingEdit,setLoadingEdit]=useState(EditProjectId?true:false)

const {register,handleSubmit,formState:{errors,isSubmitting},setValue}=useForm<IProjectData>()

const onSubmit=async(values:IProjectData)=>{
console.log(values)
// if (EditProjectId) setLoadingEdit(true)
try {
 const {data}= projectId?await axiosPrivateInstance.put(PROJECTS_URLS.UPDATE_PROJECT(EditProjectId),values)
  :await axiosPrivateInstance.post(PROJECTS_URLS.CREAT_PROJECT,values)
console.log(data)
  toast.success(projectId?'You Have Updated The Project Successfully!':'New project has been added successfully!')
navigate("/dashboard/projects")
} catch (error) {
 console.log(error)
if(error instanceof AxiosError){
  toast.error(error.response?.data.message||'something went wrong')
}
}
}


useEffect(()=>{
  const getProjetBYId=async()=>{
    setLoadingEdit(true)
    try {
      const {data}=await axiosPrivateInstance.get(PROJECTS_URLS.GET_Project(EditProjectId))
      setValue('title',data.title)
      setValue('description',data.description)
    } catch (error) {
      console.log(error)
    }finally{
      setLoadingEdit(false)
    }
    }
if (EditProjectId) getProjetBYId() 
},[EditProjectId])
  return <>
  <div className="main">
  <div className="header d-flex flex-column px-3 py-4">
  <Link className="py-2 ps-4 text-decoration-none text-black" to={'/dashboard/projects'} >   <i className="fa-solid fa-angle-left pe-2 "></i>  Veiw All Projects</Link>
  <h2 > Add a New Project</h2>
  </div>
  </div>

  <Container>
    <Row className="justify-content-center d-flex mt-5">
      <Col md={8}>
      <div className="project-data p-5 d-flex flex-column">
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
        <div className="btns mt-3 d-flex justify-content-between">
          <Link className="btn btn-cancel rounded-pill d-flex justify-content-center align-items-center py-2 px-3"to={'/dashboard/projects'}>Cancel</Link>
        {EditProjectId?  <button className="btn btn-save rounded-pill text-white py-2 px-3">
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
