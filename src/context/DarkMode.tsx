import { createContext, ReactNode, useEffect, useState } from "react";

export const DarkModeContext=createContext<any>(null)
const DarkModeProvider=({children}:{children:ReactNode})=>{
    const [mode,setMode]=useState( localStorage.getItem('mode')==='light'?"light":'dark')

    const toggleMode=()=>{

    setMode(mode==='light'?"dark":"light")
    }
    useEffect(()=>{

        if(mode==='light'){
    localStorage.setItem('mode','light')
    document.body.classList.remove("dark")
    document.body.classList.add("light")
}else{
    document.body.classList.remove("light")
    document.body.classList.add('dark')
    localStorage.setItem('mode','dark')

}
    },[mode])
return <DarkModeContext.Provider value={{toggleMode,mode}}>
    {children}
</DarkModeContext.Provider>
}
export default DarkModeProvider
