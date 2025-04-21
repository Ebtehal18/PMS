import React from "react";

import { Col, Container, Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useEffect } from "react";

import { USERS_URLS } from "../../../services/api/apiConfig";
import { toast } from "react-toastify";
import { Code_Validation,   Email_Validation,  
  Password_Validation, PasswordComfirm_Validation,
    } from "../../../services/Validation";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import useTogglePassword from "../../../hooks/useTogglePassword";
import {  resetData } from "../../Shared/interfaces/AuthInterface";
import { axiosPublicInstance } from "../../../services/api/apiInstance";

export default function ResetPass() {

  const navigate=useNavigate()
  const {state}=useLocation()
  const{register,formState:{errors,isSubmitting},handleSubmit,trigger,watch}=useForm<resetData>({
    defaultValues:{email:state?.email}
  });
  
  const {visible, toggleVisibility }=useTogglePassword()
  
// submit the form 
const onSubmit=async(values:resetData)=>{

  
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
  
  const password=watch('password')
  const comfirmPassword=watch('confirmPassword')
  useEffect(()=>{
    if(comfirmPassword){
      trigger('confirmPassword')
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
  {/* <Row> */}
 
        {/* email */}
        <Form.Group>
          <Form.Label htmlFor="email" className="main-color">E-mail</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="email"
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              aria-describedby="basic-addon1"
              className="input-register input-register-border"
              {...register('email',Email_Validation )}
            />
          </InputGroup>
        </Form.Group>
        {errors.email&&<span className="text-danger">{errors.email.message}</span>}

        {/* otp */}
        <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                  <Form.Label>OTP Verification</Form.Label>
                  <Form.Control type="text" placeholder="Enter Verification" className="input-register input-register-border"  {...register('seed',Code_Validation)}/>
                  {errors.seed && <p className="text-error mt-2">{errors.seed.message}</p>}
                </Form.Group>

{/* password */}
 {/* password */}
        <Form.Group as={Col} controlId="formGridCountry" autoComplete="new-password" className="mb-3 ">
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
           {/* compirm */}
               {/* comfirm password */}
        <Form.Group as={Col}  controlId="formGridCountry" className="mb-3">
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

  {/* </Row> */}
<div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
  <i className="fas fa-spinner fa-spin me-2"></i>
        <span>Saving...</span>
        </>:"Save"}</Button></div>

</Container>
    </form>
  </div>
  </>;
}
