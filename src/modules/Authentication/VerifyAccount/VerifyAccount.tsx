import { Form ,Col, Button} from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { IVerfyData } from "../../Shared/interfaces/AuthInterface"
import { USERS_URLS } from "../../../services/api/apiConfig"
import { Code_Validation, Email_Validation } from "../../../services/Validation"
import { axiosPublicInstance } from "../../../services/api/apiInstance"



const VerifyAccount = () => {
  const navigate=useNavigate()
  const {state}=useLocation()
 
  const {register,formState:{errors,isSubmitting},handleSubmit}=useForm<IVerfyData>({
    mode:'onChange',
    defaultValues:{email:state?.email}
  })



const onSubmit=async(values:IVerfyData)=>{

try {
  const {data}=await axiosPublicInstance.put(USERS_URLS.VERIFY_USER,values)
  toast.success(data?.message)
  navigate("/login")
} catch (error) {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "Something Went Wrong");
  } else if (error instanceof Error) {
    toast.error(error.message || "Something Went Wrong");
  } else {
    toast.error("Something Went Wrong");
  }
}
}
  return (
    <div className="register">
<div>  <span className="text-white">welcome to PMS</span>
<h3 className="heading">Verify Account</h3></div>
<form onSubmit={handleSubmit(onSubmit)}>
<Form.Group as={Col} controlId="formGridEmail" className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter Your Email" className="input-register input-register-border"  {...register('email',Email_Validation)}/>
          {errors.email && <p className="text-error mt-2">{errors.email.message}</p>}
        </Form.Group>
<Form.Group as={Col} controlId="formGridEmail" className="mb-3">
          <Form.Label>OTP Verification</Form.Label>
          <Form.Control type="text" placeholder="Enter Verification" className="input-register input-register-border"  {...register('code',Code_Validation)}/>
          {errors.code && <p className="text-error mt-2">{errors.code.message}</p>}
        </Form.Group>
        <div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
          <i className="fas fa-spinner fa-spin me-2"></i>
        <span>Saving...</span>
        </>:"Save"}</Button></div>
</form>
    </div>
  )
}

export default VerifyAccount
