import { createContext, ReactNode, useEffect, useState } from "react";
import { ProjectInterface } from "../modules/Shared/interfaces/ProjectInterface";
import { IUsers } from "../modules/Shared/interfaces/UserInterface";
import { axiosPrivateInstance } from "../services/api/apiInstance";
import { PROJECTS_URLS, USERS_URLS } from "../services/api/apiConfig";

export const ProjectAndUserContext = createContext<any>(null)
const ProjectAndUserProvider=({children}:{children:ReactNode})=>{

    const [projects,setProjects]=useState<ProjectInterface[]>([])
    const [users,setUsers]=useState<IUsers[]>([])
   
    const [totalPages,setTotalPages]=useState<number[]>([])
  const [totalrecords,setTotalRecords]=useState(0)
    const getAllProjects=async(pageSize:number,pageNumber:number,title?:string)=>{
        try {
         const {data}= await axiosPrivateInstance.get(PROJECTS_URLS.GET_PROJECTS_FOR_MANAGER,{
             params:{
                 pageSize,
                 pageNumber,
                 title
             }
         })
        setProjects(data?.data)
        setTotalPages(Array.from({length:data.totalNumberOfPages},(_,i)=>i+1))
        setTotalRecords(data.totalNumberOfRecords)
        // return data
        } catch (error) {
         console.log(error)
      
         throw error
 
        }
     }
     const getAllUsers=async(pageSize:number,pageNumber:number,userName?:string,country?:string,email?:string,groups?:number)=>{
        try {
         const {data}= await axiosPrivateInstance.get(USERS_URLS.GET_ALL_USERS,{
            params:{
                pageSize,
                pageNumber,
                userName,
                country,
                email,
                groups
              }
         })
        setUsers(data?.data)
        setTotalPages(Array.from({length:data.totalNumberOfPages},(_,i)=>i+1))
        setTotalRecords(data.totalNumberOfRecords)
        // return data
        } catch (error) {
         console.log(error)
      
         throw error
 
        }
     }
useEffect(()=>{
// getAllProjects(5,1)
},[])
return <ProjectAndUserContext.Provider value={{getAllProjects,projects,getAllUsers,users,totalPages,totalrecords,setProjects}}>
    {children}
</ProjectAndUserContext.Provider>
}
export default ProjectAndUserProvider