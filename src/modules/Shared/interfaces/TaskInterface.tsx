export interface ITaskData{
id:number 
status: string,
title: string,
creationDate: string,
description: string,
employee:{
    id:number   ,
    userName: string,
    email:string,
    imagePath:string,
    isActivated:boolean,
    isVerified:boolean
}
,
project:{
    id:number,
description:string 
title:string,
}

}
export interface ITasksData{
    
    title: string,
    description: string,
    employeeId: number,
    projectId: number
      
}