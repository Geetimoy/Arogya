import './ForgotPassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
//import serviceplace from "../assets/images/serviceplace-logo.png";
//import footerlogo from "../assets/images/rgvn-logo.png";

import { Link, useNavigate } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import { useContext, useState } from "react";

function ForgotPassword(){

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    userId: {required: true, value:"", errorClass:"", errorMessage:""},
  });

  const resetForm = () => {
    Object.keys(formData).forEach((element) => {
      formData[element].value = "";
      formData[element].errorMessage = "";
      formData[element].errorClass = "";
    })
    setFormData({...formData, ...formData});
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This field is required!"}});
    }
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && formData[element].value.trim() === ""){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        formData[element].errorMessage = "";
        formData[element].errorClass = "";
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let errorCounter = validateForm();
    if(errorCounter > 0){
      return false;
    }
    else{

      let jsonData = {};

      jsonData['user_login_id'] = formData["userId"].value;
      jsonData['system_id']     = systemContext.systemDetails.system_id;
      jsonData['device_type']   = DEVICE_TYPE;
      jsonData['device_token']  = DEVICE_TOKEN;
      jsonData['user_lat']      = localStorage.getItem('latitude');
      jsonData['user_long']     = localStorage.getItem('longitude');

      const response = await fetch(`${API_URL}/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();
      
      if (result.success) {
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        setTimeout(() => {
          redirect('/Verification/'+formData["userId"].value);
        }, 3000);
      } 
      else {
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
    }
  }


  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Forgot Password</span>
        </div>
        <div className='login-box change-password'>
          <img src={systemContext.systemDetails.thp_app_logo_url} className="mb-3" alt={systemContext.systemDetails.thp_system_name} />
          <h5 className='title'>Reset Password</h5>
          <p>Enter your User ID and an OTP will be sent to your registered Email ID & Mobile Number </p>
          <form onSubmit={handleFormSubmit}> 
            <div className={`form-group ${formData["userId"].errorClass}`}>
              <label htmlFor='user_id'>User ID</label>
              <input type="text" name="userId" id="userId" className='form-control' placeholder="Enter user id" onChange={handleChange} value={formData["userId"].value}/>
              <small className="error-mesg">{formData["userId"].errorMessage}</small>
            </div>
            <div className='btn primary-bg-color mb-3 mt-3 w-100'>
              <button type="submit" className='btn primary-bg-color text-light w-100'>Submit</button>
            </div>
            <p className='mb-4'>I remember my password! Back me to <Link to="/login" className="primary-color">login</Link> page </p>
            <p className="text-center link-red mb-3">
              Don't have an account yet? 
              <Link to="/signup" className="primary-color mx-1">
                Sign Up
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Having Trouble? 
              <Link to="/contactadmin" className="primary-color mx-1">
                Contact Admin
              </Link>
            </p>
            <p className='text-center'>&copy; {(new Date().getFullYear())} {systemContext.systemDetails.thp_domain_name}. {systemContext.systemDetails.thp_domain_name}. {(systemContext.systemDetails.thp_system_id > 0) && <span>Powered by <Link to={systemContext.systemDetails.thp_main_ngo_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_system_name}</Link></span>}</p>

            <div className="text-center login-logo">
              {(systemContext.systemDetails.thp_system_id > 0) && <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_ngo_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>}
              <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img src={systemContext.systemDetails.thp_sp_global_logo_url} style={{ height: "80px" }} className="mx-3" alt={systemContext.systemDetails.thp_system_name} /></Link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;