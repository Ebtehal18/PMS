import { Button, Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";
import { imgURL } from "../../../services/api/apiInstance";
import noimg from '../../../assets/no-user.jpg'

export default function ViewDetails({show,handleClose,user,loading}) {

 

  return <div>  <Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton >

  </Modal.Header>
  <Modal.Body>
    {loading?<Loading/>:
    <>
<div className="text-center">
<img src={user?.imagePath?`${imgURL}/${user?.imagePath}`:noimg} alt="user"  className="rounded-full " width={200}/>
<h5 className="mt-2">{user?.userName}</h5>
</div>
<div>
<div className="d-flex gap-2">
  <i className="fas fa-envelope text-warning"></i>
  <h6>Email:</h6>
  <span>{user?.email}</span>
</div>

<div className="d-flex gap-2">
  <i className="fas fa-phone-alt text-warning"></i>
  <h6>Phone Number:</h6>
  <span>{user?.phoneNumber}</span>
</div>

<div className="d-flex gap-2">
  <i className="fas fa-globe text-warning"></i>
  <h6>Country:</h6>
  <span>{user?.country}</span>
</div>

<div className="d-flex gap-2">
  <i className="fas fa-calendar-alt text-warning"></i>
  <h6>Creation Date:</h6>
  <span>{user?.creationDate}</span>
</div>

</div>
    </>
    }
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>

  </Modal.Footer>
</Modal></div>;
}
