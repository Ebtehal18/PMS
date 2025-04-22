// import React from "react";
import  {  useEffect,  useState } from "react";
import { axiosPrivateInstance } from "../../services/api/apiInstance";
import { USERS_URLS } from "../../services/api/apiConfig";
import Table from 'react-bootstrap/Table';
import { IUsers } from "../Shared/interfaces/UserInterface";
import { FormateDate } from "../../helpers/formateDate";
import {  InputGroup,Form,  Accordion} from "react-bootstrap";
import ViewDetails from "../Shared/ViewDetails/ViewDetails";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading/Loading";
import PaginationPage from "../Shared/Pagination/Pagination";
import NoData from "../Shared/NoData/NoData";
import { AxiosError } from "axios";
import Actions from "../Shared/Actions/Actions";

import Header from "../Shared/Header/Header";
import ActivateAndDeactivate from "../Shared/ActivateAndDeactivate/ActivateAndDeactivate";
// import { Dropdown } from "react-bootstrap";


export default function Users() {
  const [users,setUsers]=useState<IUsers[]>([])

  
  const [currentPage,setCurrentPage]=useState(1)
  const [totalPages,setTotalPages]=useState<number[]>([])
  const [totalrecords,setTotalRecords]=useState(0)

  const [select,setSelect]=useState('userName')
  const [searchValue, setSearchValue] = useState('');
  const [groupFilter, setGroupFilter] = useState<number | null>(null); // 1 or 2


  const [loading,setLoading]=useState(false)
  // const [loadingUser,setLoadingUser]=useState(false)
  const [loadingToggleUser,setLoadingToggleUser]=useState(false)
  const [selectedUser,setSelectedUser]=useState<IUsers|null>(null)

// view modal
  const [showView, setShowView] = useState(false);
  const handleCloseView = ():void => {
    setShowView(false)
    setSelectedUser(null)
  };

  const handleShowView = (user:IUsers):void =>{
    console.log(user)
    setSelectedUser(user)
    setShowView(true)
  };

// delete modal
  const [showDelation, setShowDelation] = useState(false);
  const handleCloseDelete = ():void => {
    setShowDelation(false);
    setSelectedUser(null)
  }
  const handleShowDeleteUser = (user:IUsers):void =>{
    // console.log(user)
    setSelectedUser(user)
    setShowDelation(true)
  };


// toggle to activate /deactivate user
  const toggleUser=async()=>{
    setLoadingToggleUser(true)
    try {
      if(selectedUser){
        const{data}=await axiosPrivateInstance.put(USERS_URLS.ACTIVE_EMPLOYEE(selectedUser.id))
        handleCloseDelete()
        getAllUsersList()
        console.log(data)
        toast.success(selectedUser.isActivated?"You have blocked this user successfully!":"You have activated this user successfully!")
      }
   
    } catch (error) {
      console.log(error)
     if(error instanceof AxiosError){
      toast.error(error?.response?.data?.message||'something went wrong')
     }
    }finally{
      setLoadingToggleUser(false)
    }
  }
  // get single user
  // const getUser=async(id:number)=>{
  //   setLoadingUser(true)
  //   try {
  //     const {data}=await axiosPrivateInstance.get(USERS_URLS.GET_USER(id))
  //     setUser(data)
  //     console.log(data)
   
  //   } catch (error) {
  //     console.log(error)
  //   }finally{
  //     setLoadingUser(false)
  //   }
  // }

 const getAllUsersList=async()=>{
    setLoading(true)
    try {
// await getAllUsers(5,1)
const params: any = {
  pageSize: 5,
  pageNumber: 1,
  [select]: searchValue,
};

if (groupFilter) {
  params.groups = [groupFilter];
}
      const {data}=await axiosPrivateInstance.get(USERS_URLS.GET_ALL_USERS,{
        params
      })
      setUsers(data?.data)
      console.log(data)
      setTotalPages(Array.from({length:data.totalNumberOfPages},(_,i)=>i+1))
      setTotalRecords(data.totalNumberOfRecords)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getAllUsersList();
  }, [searchValue]);
  
// input
  const getByName=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value}=e.target
    setSearchValue(value)
}
// select
const handelChangeInput=(e:React.ChangeEvent<HTMLSelectElement>)=>{
  const value = e.target.value;
console.log(value)
  // If group option selected
  if (value === "1" || value === "2") {
    setGroupFilter(Number(value));  
    setSelect("userName");           
  } else {
    setGroupFilter(null);            
    setSelect(value);                
  }

  }

  return <>
  <div className="main">
<Header title={'Users'}/>

<div className="main-content pt-3">

<div className="content mt-md-4 mx-md-4 mx-2 overflow-hidden  rounded-top-4 ">

  <div  className="d-flex flex-column flex-md-row my-3 pt-4 g-4">

  <InputGroup className="mx-3">
  <InputGroup.Text id="basic-addon1">
    <i className="fas fa-search"></i>
  </InputGroup.Text>
  <Form.Control
    onChange={getByName}
    value={searchValue}
    placeholder={
         select === "1"
        ? "Search Group Manager"
        : select === "2"
        ? "Search System Employee"
        : `Search by ${select}`
    }

    aria-label="Username"
    aria-describedby="basic-addon1"
    className="text-black h-100 search-input border-start-0"
  />
</InputGroup>



      <Form.Select onChange={handelChangeInput} className="filter rounded-pill mt-2 mt-md-0 mx-3" >
        <option>filter</option>
        <option>email</option>
        <option>country</option>
        <option value="1">Group Manager</option>
  <option value="2">System Employee</option>

      </Form.Select>
        </div>

    <div className="d-none d-md-block overflow-x-auto">
    <Table striped bordered hover className="mb-0 ">
{loading?
<td colSpan={6}><Loading/></td>:
<>
      <thead>
        <tr>
          <th className="text-center">User Name</th>
          <th className="text-center">Statues</th>
          <th className="text-center">Phone Number</th>
          <th className="text-center">Email</th>
          <th className="text-center">Date Created</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
{users.length>0?  users.map((user)=><tr key={user.id}>
          <td className="align-middle text-center">{user.userName}</td>
          <td className={ `align-middle text-center rounded-pill text-white ${user.isActivated?"active-status":"inactive"}`}>{user.isActivated?'Active':'Not Active'}</td>
          <td className="align-middle text-center">{user.phoneNumber}</td>
          <td className="align-middle text-center">{user.email}</td>
          <td className="align-middle text-center">{FormateDate(user.creationDate)}</td>
          <td className="text-center align-middle">
      <Actions isActivated={user?.isActivated}  handleShowDeleteUser={handleShowDeleteUser} user={user} handleUserDelete={toggleUser} handleShowView={handleShowView}/>

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
    <div className="d-block d-md-none">
    {loading?<Loading/>:
<>
{users.length>0? users.map((user) => (
    <Accordion key={user.id} className="mb-2">
      <Accordion.Item eventKey="0">
        <Accordion.Header className={`d-flex justify-content-between align-items-center  `} style={{ backgroundColor: user.isActivated ? '#198754' : '#dc3545' }} >
        <div className="w-100 d-flex align-items-center justify-content-between px-2">
    <div className="user-name flex-grow-1 text-start text-white">{user.userName}</div>
    <div className="custom-toggle-icon mx-3"></div>
    </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="d-flex justify-content-between">
<div>
<p><strong>Status:</strong> {user.isActivated ? 'Active' : 'Not Active'}</p>
          <p ><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date Created:</strong> {FormateDate(user.creationDate)}</p>
</div>
<Actions isActivated={user?.isActivated}  handleShowDeleteUser={handleShowDeleteUser} user={user} handleUserDelete={toggleUser} handleShowView={handleShowView}/>

          </div>
     
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )):<NoData/>}
</>

}
</div>
</div>
</div>
  </div>

{users.length>0? <PaginationPage currentPage={currentPage} setCurrentPage={setCurrentPage} getFun={getAllUsersList} totalPages={totalPages} totalrecords={totalrecords}/>
:""}
{selectedUser&&  <ViewDetails show={showView} handleClose={handleCloseView} user={selectedUser} />
}
  <ActivateAndDeactivate isActivated={selectedUser?.isActivated??false}    show={showDelation} handleClose={handleCloseDelete}  deleteFun={toggleUser} loading={loadingToggleUser} />
  </>

}