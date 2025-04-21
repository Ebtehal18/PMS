import {  Modal } from "react-bootstrap";

export default function DelationComfiramtion({show,handleClose,deleteFun,loading,isActivated,user,title}:
  { show: boolean;
  handleClose: () => void;
  deleteFun: () => Promise<void>;
  loading: boolean;
  isActivated?:boolean,
  user?:boolean,
  title?:string
}) {
// console.log(isActivated)
    return <div>  
          <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center d-flex flex-column">
       {user?<>
        <i className={`fa-solid ${isActivated ? 'fa-user-slash text-danger' : 'fa-user-check text-success'} fa-2x mb-2`}></i>
        {`Are You Sure You Want to ${isActivated?"Block This User":"Activate this user"}?!`}
       </>:<>
       <i className={`fa-solid fa-circle-xmark text-danger fa-2x mb-2`}></i>
       {`Are You Sure You Want to Delete ${title}?!`}
       </>}
            </div>
        </Modal.Body>
        <Modal.Footer>
        
  {user?    <button className={`btn  text-white ${isActivated?"bg-danger":"bg-success"}`}  onClick={deleteFun}>
         {loading?<>

         <span>{isActivated?'Blocking...':'Activating...'}</span>
         <i className="fas fa-spinner fa-spin"></i>

         </>:isActivated?"Block":'Activate'}
          </button>:   
           <button className={`btn  text-white bg-danger`}  onClick={deleteFun}>
         {loading?<>
         <span>Deleting...</span>
         <i className="fas fa-spinner fa-spin"></i>

         </>:'Delete'}
          </button>}
        </Modal.Footer>
      </Modal>
</div>;
}
