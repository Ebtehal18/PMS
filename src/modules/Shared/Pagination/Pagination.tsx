import { Pagination } from "react-bootstrap";

export default function PaginationPage({currentPage,setCurrentPage,getFun,totalPages,totalrecords}:
    {
    currentPage:number,
    setCurrentPage:(num:number)=>void,
    getFun:(size:number,page:number)=>void,
    totalPages:number[],
    totalrecords:number

}) {
  return <>
   <div className="my-0 rounded-bottom-4 shadow-content  mx-md-4 mx-2  py-2 border-top">
  <Pagination className="flex-wrap pagination-container mb-0 py-3 pe-2  d-flex justify-content-center justify-content-md-end">
  
  <div className="d-flex align-items-center gap-2 ms-auto">
  <p className="mb-0">
  Showing
  </p>
  {/* sekect from totalpages */}
        <select className="rounded-3 px-2" value={currentPage} onChange={(e)=>{
          const selectedPage = Number(e.target.value);
          setCurrentPage(selectedPage)// for value to be shown in ui
          getFun(5,selectedPage)
        }}>
        {totalPages.map(page=><option>{page}</option>)}
        </select>
        
  <div>
  of {totalrecords} Results
  </div>
  </div>
  
  
   <div className="d-flex align-items-center">
   <p className="mb-0">    Page {currentPage} of {totalPages.length}</p>
        <i className={  `fa-solid fa-angle-left mx-2 ${currentPage===1?'disabled text-muted':""}`} style={{cursor:"pointer"}} onClick={()=>{
     if (currentPage>1){
      const prevpage=currentPage-1
      setCurrentPage(prevpage)
      getFun(5,prevpage)

     }
   }}></i> 
        <i className={`fa-solid fa-angle-right mx-2 ${currentPage===totalPages.length?'disabled text-muted':""}`} style={{cursor:"pointer"}}
         onClick={()=>{
     
           if(currentPage<totalPages.length){
             const nextpage=currentPage+1
             setCurrentPage(nextpage)
             getFun(5,nextpage)
   }
   }}></i>  
   
   </div> 
      </Pagination>
  </div>
  </>;
}
