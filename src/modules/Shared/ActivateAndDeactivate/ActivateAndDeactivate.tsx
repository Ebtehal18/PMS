import { Modal } from "react-bootstrap";

export default function ActivateAndDeactivate({show,handleClose,loading,deleteFun,isActivated}:{ 
    show: boolean;
    isActivated:boolean;
    handleClose: () => void;
    deleteFun: () => Promise<void>;
    loading: boolean}) {
  return <>
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center d-flex flex-column">

        <i className={`fa-solid ${isActivated ? 'fa-user-slash text-danger' : 'fa-user-check text-success'} fa-2x mb-2`}></i>
        {`Are You Sure You Want to ${isActivated?"Block This User":"Activate this user"}?!`}

            </div>
        </Modal.Body>
        <Modal.Footer>
        
     <button className={`btn  text-white ${isActivated?"bg-danger":"bg-success"}`}  onClick={deleteFun}>
         {loading?<>

         <span>{isActivated?'Blocking...':'Activating...'}</span>
         <i className="fas fa-spinner fa-spin"></i>

         </>:
         
         isActivated?"Block":'Activate'
         }
          </button>

        
    
        </Modal.Footer>
      </Modal>
  </>;
}
