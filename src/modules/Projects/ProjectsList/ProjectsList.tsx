import {  useContext, useEffect, useState } from "react";
import PaginationPage from "../../Shared/Pagination/Pagination";
import NoData from "../../Shared/NoData/NoData";
import { Col,  InputGroup, Row, Table,Form, Accordion } from "react-bootstrap";
import { FormateDate } from "../../../helpers/formateDate";
import Loading from "../../Shared/Loading/Loading";
import { axiosPrivateInstance } from "../../../services/api/apiInstance";
import { ProjectInterface } from "../../Shared/interfaces/ProjectInterface";
import { PROJECTS_URLS } from "../../../services/api/apiConfig";
import DelationComfiramtion from "../../Shared/DelationComfiramtion/DelationComfiramtion";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Actions from "../../Shared/Actions/Actions";
import { AuthContext } from "../../../context/AuthContext";
import Header from "../../Shared/Header/Header";



export default function ProjectList() {
  const [projects,setProjects]=useState<ProjectInterface[]>([])


  const [currentPage,setCurrentPage]=useState(1)


  const [totalPages,setTotalPages]=useState<number[]>([])
  const [totalrecords,setTotalRecords]=useState(0)
  const [loading,setLoading]=useState(false)
 
  const [selectedProject,setSelectedProject]=useState<number|null>(null)


 //delete modal
  const [showDelation, setShowDelation] = useState(false);
  const handleCloseDelete = ():void => setShowDelation(false);
  const handleShowDelete = (id:number):void =>{

    setSelectedProject(id)
    setShowDelation(true)
  };

const {loginData}=useContext(AuthContext)
  // get all projects
  const getAllProjectsList=async(pageSize:number,pageNumber:number,title?:string)=>{
    setLoading(true)
    try {
     const{data}= loginData.userGroup==='Manager'?   
     await axiosPrivateInstance.get(PROJECTS_URLS.GET_PROJECTS_FOR_MANAGER,{
      params:{
        pageSize,
        pageNumber,
        title
      }
     })
     :await axiosPrivateInstance.get(PROJECTS_URLS.GET_PROJECTS_FOR_EMPLOYEE)
     console.log(data)
setProjects(data.data)
      // console.log(data)
      setTotalPages(Array.from({length:data.totalNumberOfPages},(_,i)=>i+1))
      setTotalRecords(data.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  // delete project
  const deleteProject=async()=>{
if(selectedProject){
  setLoading(true)
  try {
    const{data}=await axiosPrivateInstance.delete(PROJECTS_URLS.DELETE_Project(selectedProject))
console.log(data)
handleCloseDelete()
getAllProjectsList(5,1)
toast.success("You Have Successfully Deleted This Project")
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError){
      toast.error(error.response?.data?.message||'Something Went Wrong')
    }
  }
}
  }

  const getByTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
// const {value}=e.target
getAllProjectsList(5,1,e.target.value)
  }


  useEffect(()=>{
    getAllProjectsList(5,1)
    },[])

return <>
<div className="main">
  <Header title={'Projects'} to={'/dashboard/add-project'} link={'+ Add Project'}/>

</div>
<div className="main-content pt-3">
<div className="content mt-md-4 mx-md-4 mx-2 overflow-hidden  rounded-top-4 ">
<Row className="d-flex gap-4 ">
  <Col  className="d-flex my-3 g-4">

   <InputGroup className="mx-3">
        <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
        <Form.Control
          onChange={getByTitle}

          // ref={inputRef}

          // value={searchValue}
          placeholder="Search Title..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          className="text-balck h-100 search-input border-start-0 "
        />
      </InputGroup>


        </Col>
 </Row>

<div className="d-none d-md-block">
<Table striped bordered hover className="mb-0 ">
{loading?
<td colSpan={6}><Loading/></td>:
<>
      <thead>
        <tr>
          <th>Title</th>
          <th>Num Tasks</th>
          <th>Description   </th>
          <th>Date Created</th>
        {loginData?.userGroup==='Manager'&&          <th>Actions</th>        }
        </tr>
      </thead>
      <tbody>
{projects.length>0?  projects.map((project)=><tr key={project.id}>
          <td className="align-middle text-center">{project.title}</td>
          <td className="align-middle text-center">{project.task.length}</td>
          <td className="align-middle text-center">{project.description}</td>
          <td className="align-middle text-center">{FormateDate(project.creationDate)}</td>
          {  loginData?.userGroup==='Manager'&&         <td className="text-center align-middle"> <Actions   handleProjectDelete={handleShowDelete} projectId={project.id}/></td>
        }
        </tr>)
:<td colSpan={6} className="text-center"><NoData/></td>
}
</tbody>
</>
}


    
    </Table>
</div>


{/* /mobile */}
<div className="d-block d-md-none">
  {loading ? (
    <Loading />
  ) : projects.length > 0 ? (
    projects.map((project) => (
      <Accordion key={project.id} className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header style={{backgroundColor:'#fff3cd'}}>
<div className="w-100 d-flex align-items-center justify-content-between px-2">
            {project.title}

          <div className="custom-toggle-icon mx-3"></div>
       
</div>
          </Accordion.Header>
          <Accordion.Body>
          <div className="d-flex justify-content-between">
       <div>   <p><strong>Num Tasks:</strong> {project.task.length}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Date Created:</strong> {FormateDate(project.creationDate)}</p></div>
            {loginData?.userGroup==='Manager'&&  <Actions 
          
          handleProjectDelete={handleShowDelete} 
          projectId={project.id} 
        />}
           
          </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ))
  ) : (
    <NoData />
  )}
</div>

</div>
</div>
{projects.length>0? <PaginationPage currentPage={currentPage} setCurrentPage={setCurrentPage} getFun={getAllProjectsList} totalPages={totalPages} totalrecords={totalrecords}/>
:''}
<DelationComfiramtion show={showDelation} handleClose={handleCloseDelete} loading={loading} deleteFun={deleteProject} title="Project" />
</>

  }


