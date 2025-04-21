import { Col, Container, Row,Form, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react";

import { USERS_URLS } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import { Country_Validation,  Email_Validation,  
  Password_Validation, PasswordComfirm_Validation,
    Phone_Validation,  UserName_Validation } from "../../../services/Validation";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import registerImage from '../../../assets/register-img.png';
import useTogglePassword from "../../../hooks/useTogglePassword";
import { IRegisterData } from "../../Shared/interfaces/AuthInterface";
import { axiosPublicInstance } from "../../../services/api/apiInstance";

const Register = () => {
  const [registerImagePath, setRegisterImage] = useState(registerImage); 
  const fileInputRef = useRef<HTMLInputElement | null>(null); 

  const navigate=useNavigate()

  const {visible, toggleVisibility }=useTogglePassword()
  const {register,handleSubmit,formState:{errors,isSubmitting},watch,trigger,setValue}=useForm<IRegisterData>({
    mode:'onChange'
  })

//  const { visible, toggleVisibility }=useTogglePassword()


  // to open file througth inpout file
  const handleImageClick = () => {
    if(fileInputRef.current){
      fileInputRef.current.click()
    }
  };
  
// to handle file upload
  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setRegisterImage(URL.createObjectURL(file))
      setValue('profileImage',file)
    }
  };


// submit the form 
  const onSubmit=async(values:IRegisterData)=>{

const formData=new FormData()
Object.entries(values).forEach(([key, value]) => {
  if (typeof value === "string" || value instanceof File) {
    formData.append(key, value);
  }
});


try {
  const {data}=await axiosPublicInstance.post(USERS_URLS.REGISTER,formData)
  toast.success(data?.message)
  navigate("/verify-account",{state:{email:values.email}})
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

const password=watch('password')
const comfirmPassword=watch('confirmPassword')
useEffect(()=>{
  if(comfirmPassword){
    trigger('confirmPassword')
  }
},[password,comfirmPassword,trigger])


  return (
    <div className="register">
  <div>
  <span className="text-white">welcome to PMS</span>
  <h3 className="heading">Create New Account</h3>
  </div>


    <form onSubmit={handleSubmit(onSubmit)} >
   <div className="text-center ">
   <img
        src={registerImagePath}
        alt="Upload Profile"
        onClick={handleImageClick} 
        width={95}
        className="rounded-full  img-upload"
      />
      <input
        type="file"
        {...register("profileImage")}
        ref={fileInputRef} 
        accept="image/*"
        className="file-upload"
        onChange={handleImageChange}
      />
   </div>
<Container className="mt-3">
  <Row>
    {/* user name */}
  <Form.Group as={Col}  xs={12} md={6} controlId="formGridEmail" className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" className='input-register input-register-border  text-start '  {...register('userName',UserName_Validation)}/>
          {errors.userName && <p className="text-error mt-2">{errors.userName.message}</p>}
        </Form.Group>
        {/* email */}
        <Form.Group as={Col}  xs={12} md={6} controlId="formGridEmail" className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter your E-mail" className='input-register  input-register-border text-start ' {...register('email',Email_Validation)} />
          {errors.email && <p className="text-error mt-2">{errors.email.message}</p>}
        </Form.Group>
        {/* country */}
        <Form.Group as={Col}  xs={12} md={6} controlId="formGridCountry" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" placeholder="Enter your country" className='input-register input-register-border text-start ' {...register('country',Country_Validation)} />
            {errors.country && <p className="text-error mt-2">{errors.country.message}</p>}
        </Form.Group>
     
        {/* phone number */}
        <Form.Group as={Col}  xs={12} md={6} controlId="formGridCountry" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Enter your phone number" className='input-register input-register-border text-start ' {...register('phoneNumber',Phone_Validation)} />
          {errors.phoneNumber && <p className="text-error mt-2">{errors.phoneNumber.message}</p>}
        </Form.Group>
        {/* password */}
        <Form.Group as={Col}  xs={12} md={6} controlId="formGridCountry" autoComplete="new-password" className="mb-3 ">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
        <Form.Control
        {...register("password",Password_Validation)}
          type={visible.password? "text" : "password"}
          placeholder="Enter your Password"
          className="input-register"
        />
        <span 
          className="input-group-text"
          onClick={()=>toggleVisibility('password')}
     
        >
           <i className={visible.password ? "fas fa-eye" : "fas fa-eye-slash"}></i>
        </span>
        </div>
           {errors.password && <p className="text-error mt-2">{errors.password.message}</p>}
        </Form.Group>
        {/* comfirm password */}
        <Form.Group as={Col}  xs={12} md={6} controlId="formGridCountry" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
          <div className="input-group">
        <Form.Control
          type={visible.comfirmPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          className="input-register"
          {...register("confirmPassword",{
            ...PasswordComfirm_Validation,
            validate:(value:string)=>value===watch('password')||'password dont match'

          })}
        />
        <span 
          className="input-group-text"
          onClick={()=>toggleVisibility('comfirmpassword')}
     
        >
          <i className={visible.comfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
        </span>
        </div>
        {errors.confirmPassword && <p className="text-error mt-2">{errors.confirmPassword.message}</p>}
      
        </Form.Group>


  </Row>
<div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
  <i className="fas fa-spinner fa-spin me-2"></i>
        <span>Saving...</span>
        </>:"Save"}</Button></div>

</Container>
    </form>
    </div>
  )
}

export default Register
