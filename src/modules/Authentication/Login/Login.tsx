import {  Form, InputGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../Services/Validation";
import { axiosPublicInstance } from "../../../services/api/apiInstance";

import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { USERS_URLS } from "../../../services/api/apiConfig";
import { LoginFormInputs } from "../../Shared/interfaces/AuthInterface";
import { AxiosError } from "axios";
import { Email_Validation, Password_Validation } from "../../../services/Validation";
import useTogglePassword from "../../../hooks/useTogglePassword";


 
const Login = () => {
  const {getCurrentUser,fillLoginData}=useContext(AuthContext)
  const navigate=useNavigate()
  const{register,formState:{errors,isSubmitting},handleSubmit}=useForm<LoginFormInputs>();
  
  const {visible, toggleVisibility }=useTogglePassword()
  const ONSUBMIT=async(data:LoginFormInputs)=>{
    // console.log(data)
    try{
      const response=await axiosPublicInstance.post(USERS_URLS.LOGIN,data);
      toast.success(response.data.message||"logged Successfully!")
      // const token = response.data.token;
      localStorage.setItem('token',response.data.token);
      fillLoginData()
      await getCurrentUser();
      navigate('/dashboard')
    }catch (error) {
      console.log(error)
      if (error instanceof AxiosError && error.response) {
       toast.error(error.response.data.message||"An error occurred");
     } else {
       toast.error("An unexpected error occurred.");
     }
 }
  }

  return (
    <div className="register">
    <div>
  <span className="text-white">welcome to PMS</span>
  <h3 className="heading">Login</h3>
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

        <Form.Group>
          <Form.Label htmlFor="password" className="main-color">Password</Form.Label>
          <InputGroup className="mb-3 ">
            <Form.Control
              id="password"
              type={visible.password?"text":"password"}
              placeholder="Enter your Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              className="input-register input-register-border"
              {...register('password',Password_Validation
              
              )}

            />
             <span className='input-group-text '
            onClick={() => toggleVisibility('password')}>
            <i className={`fas ${visible.password ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </InputGroup>
         
        </Form.Group>
        {errors.password&&<span className="text-danger">{errors.password.message}</span>}


        <div className="d-flex links justify-content-between mb-4 text-white">
          <a  className="text-decoration-none text-white" style={{cursor:"pointer"}} onClick={()=>navigate('/register')}>Register Now?</a>
          <a  className="text-decoration-none text-white" style={{cursor:"pointer"}} onClick={()=>navigate('/forget-password')}>Forget Password?</a>
        </div>

        <div className="w-75 mx-auto"><Button disabled={isSubmitting} className="save-btn w-100 mt-4 rounded-pill" type="submit">{isSubmitting?<>
  <i className="fas fa-spinner fa-spin me-2"></i>
        <span>LoginngIn...</span>
        </>:"Login"}</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
