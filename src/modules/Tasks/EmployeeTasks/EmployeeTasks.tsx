
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosPrivateInstance } from "../../../services/api/apiInstance";
import { TASKS_URLS } from "../../../services/api/apiConfig";
import { ITaskBoard, status, TaskBoardResponse } from "../../Shared/interfaces/TaskBoardInterface";
import { toast } from "react-toastify";
import { motion } from "framer-motion"

export default function EmployeeTasks() {
const [tasks,setTasks]=useState<ITaskBoard[]>([])
const ToDo=tasks?.filter(task=>task.status==='ToDo')
const InProgress=tasks?.filter(task=>task.status==='InProgress')
const Done=tasks?.filter(task=>task.status==='Done')

  const getAssignedTasks=async()=>{
try {
  const {data}=await axiosPrivateInstance.get<TaskBoardResponse>(TASKS_URLS.GET_MY_ASSIGNED_TASKS)
  console.log(data.data)
  setTasks(data.data)
} catch (error) {
  console.log(error)
}
  }
  useEffect(()=>{
    getAssignedTasks()
  },[])
  return <>
      <div className="main">
  <div className="header d-flex flex-column px-3 py-4">
  <h2 >Task Board</h2>
  </div>
  </div>

  <Container className="mt-4">
    <Row>
     <TaskCol title="ToDo" tasks={ToDo} getAssignedTasks={getAssignedTasks} setTasks={setTasks}/>
        <TaskCol title='InProgress' tasks={InProgress} getAssignedTasks={getAssignedTasks} setTasks={setTasks}/>
        <TaskCol title='Done' tasks={Done} getAssignedTasks={getAssignedTasks} setTasks={setTasks}/>
   
    </Row>
  </Container>
  </>;
}
// drag card
// drop task 
const TaskCol=({title,tasks,getAssignedTasks,setTasks}:
  {title:status,
  tasks:ITaskBoard[],
  getAssignedTasks:()=> Promise<void>,
  setTasks:React.Dispatch<React.SetStateAction<ITaskBoard[]>>
})=>{

  const changeStatus=async(id:number,status:string)=>{
    console.log(status)
    try {
      await axiosPrivateInstance.put(TASKS_URLS.CHANGE_STATUS(id),{status:status})
      // console.log(data)
      await getAssignedTasks()
      toast.success("Status Changed Successfully!")
    } catch (error:any) {
   if(error){
    toast.error(error?.response.data.message)
   }
    }
  }
  return    <Col md={4} 
 
   >
  <h3 style={{fontSize:"22px"}} className="task-color">{title}</h3>
  <motion.div
  layout
  layoutId={title}
  key={title}
   className="rounded-4 task-employee p-3"
   onDrop={async(e)=>{
    e.preventDefault()
    // next status that title is next status
    // console.log(title)
  const id=Number(e.dataTransfer.getData('taskId'))
  const status=e.dataTransfer.getData('prevState')
  console.log(status,id)
  // title in drop 
  if(status===title) return
  setTasks((prev)=>{
      const newTasks=prev.map((task)=>{
  if(task.id===id){
    // title in card
   task.status=title
   return task
  }else{
    return task
  }
  
})


return newTasks
  })
  // React waits for all the synchronous code to finish — but NOT for async awaited code — before triggering a re-render.
  await changeStatus(id,title)

  }}
  onDragOver={(e)=>{
    e.preventDefault()
    console.log('over')
  }}
  >
  {tasks.map(task=> <motion.div 
  layout
  layoutId={task.id.toString()}

   key={task.id} className="task rounded-3 text-white py-2 px-3" 
  draggable
  // drag
  // to get id for drop as we have already the status
  // drag start first 
  // then drop
  // darg end 
  onDragStart={(e:any)  => {
    console.log('start');
    e.dataTransfer.setData('taskId', task.id.toString());
    e.dataTransfer.setData('prevState', task.status);
  }}
    // onDragEnd={(e)=>console.log('end')}

>{task.title}</motion.div>)
  }

  </motion.div>
  </Col>
}