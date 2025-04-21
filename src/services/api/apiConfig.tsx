
// USERS_URLS
export const USERS_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    GET_USER:(id:number)=>`/Users/${id}`,
    ACTIVE_EMPLOYEE:(id:number)=>`/Users/${id}`,
    GET_USERS_COUNT:`/Users/count`,
    GET_USERS:`/Users/Manager`,
    VERIFY_USER:`/Users/verify`,
    GET_CURRENT_USER:`/Users/currentUser`,
    GET_ALL_USERS:`/Users/`,
    UPDATE_PROFILE:`/Users/`,
    UPDATE_USER_PASSWORD:`/Users/ChangePassword`,
    Request_RESET_PASSWORD:`/Users/Reset/Request`,
    RESET_PASSWORD:`/Users/Reset`,

    
}
// project urls
export const PROJECTS_URLS={
    GET_PROJECTS_FOR_MANAGER:"/Project/manager",
    GET_PROJECTS_FOR_EMPLOYEE:"/Project/employee",
    CREAT_PROJECT:"/Project",
    UPDATE_PROJECT:(id:number)=>`/Project/${id}`,
    DELETE_Project:(id:number)=>`/Project/${id}`,
    GET_Project:(id:number)=>`/Project/${id}`
}
// tasks urls
export const TASKS_URLS={
    GET_TASKS_FOR_MANAGER:"/Task/manager",
    CREAT_TASK:"/Task",
    UPDATE_TASK:(id:number)=>`/Task/${id}`,
    DELETE_TASK:(id:number)=>`/Task/${id}`,
    GET_TASK:(id:number)=>`/Task/${id}`,
    COUNT_TASK:'/Task/count',
    CHANGE_STATUS:(id:number)=>`/Task/${id}/change-status`,
    GET_MY_ASSIGNED_TASKS:'/Task'
}