
import { axiosPrivateInstance } from "../../../services/api/apiInstance";
import { useEffect, useState } from "react";
import { TASKS_URLS } from "../../../services/api/apiConfig";
import { ITaskData } from "../../Shared/interfaces/TaskInterface";
import NoData from "../../Shared/NoData/NoData";
import Loading from "../../Shared/Loading/Loading";
import { Accordion, Col,  Form, InputGroup, Row, Table } from "react-bootstrap";
import { FormateDate } from "../../../helpers/formateDate";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import DelationComfiramtion from "../../Shared/DelationComfiramtion/DelationComfiramtion";
import Header from "../../Shared/Header/Header";
import PaginationPage from "../../Shared/Pagination/Pagination";
import Actions from "../../Shared/Actions/Actions";

export default function TasksList() {
  const [tasks,setTasks]=useState<ITaskData[]>([])
  const [loading,setLoading]=useState(true)
  const [loadingDelte,setLoadingDelete]=useState(false)
  const [title,setTitle]=useState('')
  const [status,setStatus]=useState('')
  const [selectedTask,setSelectedTask]=useState<number|null>(null)
  
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState<number[]>([])
  const [totalrecords,setTotalRecords]=useState(0)

  const [showDelation, setShowDelation] = useState(false);
  const handleCloseDelete = ():void => setShowDelation(false);
  const handleShowDelete = (id:number):void =>{

    setSelectedTask(id)
    setShowDelation(true)
  };


  const getAllTasks=async(pageSize:number,pageNumber:number,title?:string,status?:string)=>{
    setLoading(true)
    try {
      const {data}=await axiosPrivateInstance.get(TASKS_URLS.GET_TASKS_FOR_MANAGER,{
        params:{
          pageSize,
          pageNumber,
          title,
          status
        }
      })
    setTasks(data?.data)
    setTotalPages(Array.from({length:data.totalNumberOfPages},(_,i)=>i+1))
    setTotalRecords(data.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }


  const deleteTask=async()=>{
    setLoadingDelete(true)
    try {
if(selectedTask){
await axiosPrivateInstance.delete(TASKS_URLS.DELETE_TASK(selectedTask))
  handleCloseDelete()
  getAllTasks(5,1)
  toast.success('Task deleted successfully!')
 
}
    } catch (error) {
       if (error instanceof AxiosError){
            toast.error(error.response?.data?.message||'Something Went Wrong')
          }
      
    }finally{
      setLoadingDelete(false)
    }
  }

  const handelChangeInput=(e:React.ChangeEvent<HTMLSelectElement>)=>{
setStatus(e.target.value)
getAllTasks(5,1,title,e.target.value)

  }
  const handleTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
setTitle(e.target.value)
getAllTasks(5,1,e.target.value,status)
  }


  useEffect(()=>{
getAllTasks(5,1)
  },[])
  return <>
  <div className="main">
    <Header title={'Tasks'} to={'/dashboard/add-task'} link={'+ Add New Task'}/>
</div>

<div className="main-content pt-3">
<div className="content mt-md-4 mx-md-4 mx-2 overflow-hidden  rounded-top-4  ">
<Row className="d-flex gap-4 ">
  <Col  className="d-flex flex-column flex-md-row my-3 pt-4 g-4">

  <InputGroup className="mx-3">
        <InputGroup.Text id="basic-addon1"><i className="fas fa-search"></i></InputGroup.Text>
        <Form.Control
          onChange={handleTitle}
          value={title}
          placeholder="Search By Title..."
          aria-label="title"
          aria-describedby="basic-addon1"
          className="text-balck h-100 search-input border-start-0 "
        />
      </InputGroup>


      <Form.Select onChange={handelChangeInput} className="filter rounded-pill mx-3 mt-2 mt-md-0" >
        <option value=''>filter</option>
        <option>ToDo</option>
        <option>InProgress</option>
        <option >Done</option>
  
      </Form.Select>
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
          <th>Status</th>
          <th>User</th>
          <th>Description</th>
          <th>Date Creation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
{tasks.length>0?  tasks.map((task)=><tr key={task.id}>
          <td className="align-middle text-center">{task.title}</td>
          <td className={ `align-middle text-center rounded-pill text-white 
              ${task.status === 'Done' ? 'active-status' : ''}
    ${task.status === 'InProgress' ? 'in-progress' : ''}
    ${task.status === 'ToDo' ? 'to-do' : ''}
            `}>{task.status}</td>
          <td className="align-middle text-center">{task.employee.userName}</td>
          <td className="align-middle text-center">{task.description}</td>
          <td className="align-middle text-center">{FormateDate(task.creationDate)}</td>
          <td className="text-center align-middle">
            <Actions taskId={task.id} handleShowDeleteTaskist={handleShowDelete}/>
   
          </td>
        </tr>)
:<td colSpan={6} className="text-center"><NoData/></td>
}
</tbody>
</>
}


    
    </Table>
</div>
{/* mobile */}
{/* Mobile View - Accordion for Tasks */}
<div className="d-block d-md-none">
  {loading ? (
    <Loading />
  ) : tasks.length > 0 ? (
    tasks.map((task) => (
      <Accordion key={task.id} className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header className={`d-flex justify-content-between align-items-center 
            ${task.status === 'Done' ? 'active-status' : ''}
                  ${task.status === 'InProgress' ? 'in-progress' : ''}
                  ${task.status === 'ToDo' ? 'to-do' : ''}`}>
            <div className="w-100 d-flex justify-content-between align-items-center">
              <span>{task.title}</span>
              <div className="custom-toggle-icon mx-3"></div>
              <span
                className={`
                  badge text-white 
                  d-flex justify-content-center align-items-center
                  ${task.status === 'Done' ? 'active-status' : ''}
                  ${task.status === 'InProgress' ? 'in-progress' : ''}
                  ${task.status === 'ToDo' ? 'to-do' : ''}
                `}
              >
                {task.status}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="d-flex justify-content-between">
<div>  
  <p><strong>User:</strong> {task.employee.userName}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Date Created:</strong> {FormateDate(task.creationDate)}</p>
            </div>
              <Actions taskId={task.id} handleShowDeleteTaskist={handleShowDelete} />
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
{tasks.length>0? <PaginationPage currentPage={currentPage} setCurrentPage={setCurrentPage} getFun={getAllTasks} totalPages={totalPages} totalrecords={totalrecords}/>
:''}
<DelationComfiramtion show={showDelation} handleClose={handleCloseDelete} loading={loadingDelte} deleteFun={deleteTask} title="task" />

  </>
}
