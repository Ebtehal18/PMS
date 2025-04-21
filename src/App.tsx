import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'

import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login'
import Register from './modules/Authentication/Register/Register'
import ProtectedRoutes from './modules/Shared/ProtectedRoutes/ProtectedRoutes'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import Users from './modules/Users/Users'
import ProjectsList from './modules/Projects/ProjectsList/ProjectsList'
import TasksList from './modules/Tasks/TasksList/TasksList'
import ProjectsData from './modules/Projects/ProjectsData/ProjectsData'
import TasksData from './modules/Tasks/TasksData/TasksData'
import EmployeeTasks from './modules/Tasks/EmployeeTasks/EmployeeTasks'
import ChangePassword from './modules/Authentication/ChangePassword/ChangePassword'
import Profile from './modules/Profile/Profile'
import ForgetPass from './modules/Authentication/ForgetPass/ForgetPass'
import VerifyAccount from './modules/Authentication/VerifyAccount/VerifyAccount'
import ResetPass from './modules/Authentication/ResetPass/ResetPass'


function App() {
  const routes=createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      // errorElement:<NotFound/>,
      children:[
        {path:'',element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'forget-password',element:<ForgetPass/>},
        {path:'change-password',element:<ChangePassword/>},
        {path:'reset-password',element:<ResetPass/>},
        {path:'verify-account',element:<VerifyAccount/>},

      ]
    },

    // master layout

    {
      path:'dashboard',
      element:<ProtectedRoutes ><MasterLayout/></ProtectedRoutes>,
      // errorElement:<NotFound/>,
      children:[
        // home
        {index:true,element:<Dashboard />},
        {path:'users',element:<Users />},
        {path:'projects',element:<ProjectsList />},
        {path:'add-project',element:<ProjectsData />},
        {path:'edit-project/:projectId',element:<ProjectsData />},
        {path:'tasks',element:<TasksList />},
        {path:'add-task',element:<TasksData />},
        {path:'edit-task/:taskId',element:<TasksData />},
        {path:'employee-tasks',element:<EmployeeTasks />},
        {path:'profile',element:<Profile />},
      ]
      }

  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}/>
    </>
  )
}

export default App
