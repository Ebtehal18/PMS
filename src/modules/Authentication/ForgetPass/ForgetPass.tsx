import React from "react";
import {  Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../Services/Validation";
import { axiosPublicInstance } from "../../../services/api/apiInstance";

import { toast } from "react-toastify";


import { USERS_URLS } from "../../../services/api/apiConfig";
import { forgetData } from "../../Shared/interfaces/AuthInterface";
import { AxiosError } from "axios";
import { Email_Validation } from "../../../services/Validation";


export default function ForgetPass() {
 
  const navigate=useNavigate()
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm<forgetData>();
  
  
  const ONSUBMIT=async(data:forgetData)=>{
    console.log(data)
    try{
      const response=await axiosPublicInstance.post(USERS_URLS.Request_RESET_PASSWORD,data);
      toast.success(response.data.message||"logged Successfully!")
 
  
      navigate('/reset-password',{state:{email:data?.email}})
    }catch (error) {
      console.log(error)
      if (error instanceof AxiosError && error.response) {
       toast.error(error.response.data.message||"An error occurred");
     } else {
       toast.error("An unexpected error occurred.");
     }
 }
  }

  return <>
     <div className="register">
    <div>
  <span className="text-white">welcome to PMS</span>
  <h3 className="heading">Forget Password</h3>
  </div>
      <Form onSubmit={handleSubmit(ONSUBMIT)}>
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

 


    

        <div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
  <i className="fas fa-spinner fa-spin me-2"></i>
        <span>Verifing...</span>
        </>:"Verify"}</Button>
        </div>
      </Form>
    </div>
  </>;
}
