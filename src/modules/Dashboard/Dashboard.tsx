import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Col, Container, Row } from "react-bootstrap"
import DoughnutTasks from "./DoughnutTasks"
import DoughnutUsers from "./DoughnutUsers"

export default function Dashboard() {
  const {loginData}=useContext(AuthContext)
  return <>
  <div className="home-bg d-flex align-items-center m-md-4 m-3">
<div className="mx-3"><h3 className="title">Welcome <span  >{loginData?.userName}</span></h3>
<p className="text-white">You can add project and assign tasks to your team</p></div>
  </div>
   <Container>
   <Row className=" g-2"  >
     <Col sm={5} className="mx-md-3 mx-1">
     <div className=" mx-md-4 ">
     <DoughnutTasks/>
     </div>
     </Col>
     {loginData?.userGroup!=='Employee'?  <Col sm={5} className="mx-3">
     <div className=" mx-md-4 justify-content-center">
     <DoughnutUsers/>
     </div>
     </Col>:""}
   
   </Row>
 </Container>
  </>

}