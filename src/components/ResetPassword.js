
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import { useContext, useEffect, useState } from "react";
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import { useParams, useNavigate } from 'react-router-dom';
import CryptoJS from "crypto-js";

function ResetPassword(){

  const systemContext           = useContext(SystemContext);
  const alertContext            = useContext(AlertContext);

  const [urlParam, setUrlParam] = useState(useParams());
  const redirect                = useNavigate();

  useEffect(() => {
    if(urlParam.loginId){
      
    }
    else{
      redirect('/forgotpassword');
    }
    // eslint-disable-next-line
  }, [urlParam])

  const convertToMD5 = (str) => {
    const md5Hash = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
    return md5Hash;
  };

  const [formData, setFormData] = useState({
    newPassword: {required: true, value:"", errorClass:"", errorMessage:""},
    confirmPassword: {required: true, value:"", errorClass:"", errorMessage:""}
  });

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
        if((element === "confirmPassword") && (formData[element].value.trim() !== "") && (formData[element].value.trim() !== formData['newPassword'].value.trim())){
          formData[element].errorMessage = "Confirm Password does not match with New Password!";
          formData[element].errorClass = "form-error";
          errorCounter++;
        }
        else{
          formData[element].errorMessage = "";
          formData[element].errorClass = "";
        }
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

      jsonData['system_id']         = systemContext.systemDetails.system_id;
      jsonData['device_type']       = DEVICE_TYPE;
      jsonData['device_token']      = DEVICE_TOKEN;
      jsonData['user_lat']          = localStorage.getItem('latitude');
      jsonData['user_long']         = localStorage.getItem('longitude');
      jsonData['user_login_id']     = urlParam.loginId;
      jsonData['new_password']      = convertToMD5(formData['newPassword'].value);
      jsonData['confirm_password']  = convertToMD5(formData['confirmPassword'].value);

      const response = await fetch(`${API_URL}/forgotPasswordUpdate`, {
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
          redirect('/login');
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
          <span className='m-2'>Reset Password</span>
        </div>
        <div className='login-box reset-password'>
          <img src={systemContext.systemDetails.thp_app_logo_url} className="mb-3" alt={systemContext.systemDetails.thp_system_name} />
          <form onSubmit={handleFormSubmit}>
            <div className={`form-group ${formData["newPassword"].errorClass}`}>
              <label htmlFor='newPassword'>Enter New Password</label>
              <input type="text" name="newPassword" id="newPassword" className='form-control' placeholder="Enter New Password" onChange={handleChange} value={formData["newPassword"].value}/>
              <small className="error-mesg">{formData["newPassword"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["confirmPassword"].errorClass}`}>
              <label htmlFor='confirmPassword'>Confirm New Password</label>
              <input type="text" name="confirmPassword" id="confirmPassword" className='form-control' placeholder="Confirm New Password" onChange={handleChange} value={formData["confirmPassword"].value}/>
              <small className="error-mesg">{formData["confirmPassword"].errorMessage}</small>
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
  )
};

export default ResetPassword;