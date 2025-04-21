import React from "react";

import { Col, Container, Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useEffect } from "react";

import { USERS_URLS } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import {   
  Password_Validation, PasswordComfirm_Validation,
    } from "../../../services/Validation";
import {  useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import useTogglePassword from "../../../hooks/useTogglePassword";
import {  ChangePasswordData } from "../../Shared/interfaces/AuthInterface";
import { axiosPublicInstance } from "../../../services/api/apiInstance";

export default function ChangePassword() {
  const navigate=useNavigate()

  const{register,formState:{errors,isSubmitting},handleSubmit,trigger,watch}=useForm<ChangePasswordData>();
  
  const {visible, toggleVisibility }=useTogglePassword()
  
// submit the form 
const onSubmit=async(values:ChangePasswordData)=>{

  
  try {
    const {data}=await axiosPublicInstance.post(USERS_URLS.RESET_PASSWORD,values)
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
  
  const password=watch('newPassword')
  const comfirmPassword=watch('confirmNewPassword')
  useEffect(()=>{
    if(comfirmPassword){
      trigger('confirmNewPassword')
    }
  },[password,comfirmPassword,trigger])
  return <>
   <div className="register">
    <div>
  <span className="text-white">welcome to PMS</span>
  <h3 className="heading">Reset  Password</h3>
  </div>

  <form onSubmit={handleSubmit(onSubmit)} >

<Container className="mt-3">


{/* password */}
 {/*oldPassword */}
        <Form.Group as={Col} controlId="formGridCountry" autoComplete="new-password" className="mb-3 ">
          <Form.Label>Old Password</Form.Label>
          <div className="input-group">
        <Form.Control
        {...register("oldPassword",Password_Validation)}
          type={visible.oldPassword? "text" : "password"}
          placeholder="Enter your Old Password"
          className="input-register"
        />
        <span 
          className="input-group-text"
          onClick={()=>toggleVisibility('oldPassword')}
     
        >
           <i className={visible.oldPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
        </span>
        </div>
           {errors.oldPassword && <p className="text-error mt-2">{errors.oldPassword?.message}</p>}
           </Form.Group>
       
               {/*  password */}
        <Form.Group as={Col}  controlId="formGridCountry" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
          <div className="input-group">
        <Form.Control
          type={visible.password ? "text" : "password"}
          placeholder="CEnter your New Password"
          className="input-register"
          {...register("newPassword",Password_Validation)}
        />
        <span 
          className="input-group-text"
          onClick={()=>toggleVisibility('password')}
     
        >
          <i className={visible.password ? "fas fa-eye" : "fas fa-eye-slash"}></i>
        </span>
        </div>
        {errors.newPassword && <p className="text-error mt-2">{errors.newPassword.message}</p>}
      
        </Form.Group>

                 {/* comfirm new password */}
                 <Form.Group as={Col}  controlId="formGridCountry" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
          <div className="input-group">
        <Form.Control
          type={visible.comfirmPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          className="input-register"
          {...register("confirmNewPassword",{
            ...PasswordComfirm_Validation,
            validate:(value:string)=>value===watch('newPassword')||'password dont match'

          })}
        />
        <span 
          className="input-group-text"
          onClick={()=>toggleVisibility('comfirmpassword')}
     
        >
          <i className={visible.comfirmPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
        </span>
        </div>
        {errors.confirmNewPassword && <p className="text-error mt-2">{errors.confirmNewPassword.message}</p>}
      
        </Form.Group>


<div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
  <i className="fas fa-spinner fa-spin me-2"></i>
        <span>Saving...</span>
        </>:"Save"}</Button></div>

</Container>
    </form>
  </div>
  </>
}
