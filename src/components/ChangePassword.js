import Appfooter from "./AppFooter";
import InnerAppTop from "./InnerAppTop";

import './ChangePassword.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faQuestionCircle, faEye, faEyeSlash, faBell, faEllipsisV, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import { useContext, useState } from "react";
import CryptoJS from "crypto-js";
import AlertContext from "../context/alert/AlertContext";

import SystemContext from "../context/system/SystemContext";

import { Link } from "react-router-dom";

function ChangePassword() {

  const alertContext = useContext(AlertContext);

  const systemContext = useContext(SystemContext);

  const convertToMD5 = (str) => {
    const md5Hash = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
    return md5Hash;
  };

  const [formData, setFormData] = useState({
    currentPassword: {required: true, value:"", errorClass:"", errorMessage:""},
    newPassword: {required: true, value:"", errorClass:"", errorMessage:""},
    confirmPassword: {required: true, value:"", errorClass:"", errorMessage:""}
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

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      let jsonData = {};

      jsonData['user_login_id'] = decryptedLoginDetails.login_id;
      jsonData['device_type']   = DEVICE_TYPE;
      jsonData['user_lat']      = localStorage.getItem('latitude');
      jsonData['user_long']     = localStorage.getItem('longitude');
      jsonData['device_token']  = DEVICE_TOKEN;

      Object.keys(formData).map((key) => { return jsonData[key] = convertToMD5(formData[key].value); });

      const response = await fetch(`${API_URL}/changePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();
      
      if (result.success) {
        resetForm();
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
      } 
      else {
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

    }
  }

  const [currentPasswordType, setCurrentPasswordType] = useState(true);
  const changeCurrentPasswordType = () => {
    setCurrentPasswordType(!currentPasswordType);
  };

  const [newPasswordType, setNewPasswordType] = useState(true);
  const changeNewPasswordType = () => {
    setNewPasswordType(!newPasswordType);
  };

  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const changeConfirmPasswordType = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  return(
    <>
      <div className='app-top inner-app-top'>
          <div className='app-top-box d-flex align-items-center justify-content-between'>
            <div className='app-top-left d-flex align-items-center'>
              <div className='scroll-back'>
                <Link to="/account" className=''>
                  <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
              </div>
              <h5 className='mx-2 mb-0'>Change Password </h5>
            </div>
            <div className='app-top-right d-flex'> 
              <div className='position-relative'>
                <Link to="/notifications">
                <FontAwesomeIcon icon={faBell}  className='mx-3'/> 
                <span className='top-header-notification primary-bg-color'>3</span>
                </Link>
              </div> 
              <div className={`my-element2 ${isMActive ? 'active' : ''}`} onClick={handle2Click}><FontAwesomeIcon icon={faEllipsisV} /></div>
              <div className='drop-menu'>
                  <ul>
                    <li><Link to={"/aboutserviceplace"}>About Service Place</Link></li>
                    {
                      (systemContext.systemDetails.thp_system_id !== 0) && <li><Link to={"/about-ngo"}>About {systemContext.systemDetails.thp_system_name}</Link></li>
                    }
                    <li><Link to={"/contactus"}>Contact Us</Link></li>
                    <li><Link to={"/feedback"}>Feedback</Link></li>
                    <li><Link to={"/help"}>Help</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      <div className='app-body login-box'>
        <p>You can change your existing password here. Same pasword you have to use to login from telemedicine mobile app.</p>
        <form className="edit-user-profile-password-form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["currentPassword"].errorClass}`}>
            <label>Current Password <span>*</span>:</label>
            <input type={currentPasswordType ? `password` : `text`} className="form-control" name="currentPassword" id="currentPassword" placeholder="********" onChange={handleChange} value={formData["currentPassword"].value}/>
            <div className='icon-font' onClick={changeCurrentPasswordType}><FontAwesomeIcon icon={currentPasswordType ? faEyeSlash : faEye} /></div>
            <small className="error-mesg">{formData["currentPassword"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["newPassword"].errorClass}`}>
            <label>New Password  <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type={newPasswordType ? `password` : `text`} className="form-control" name="newPassword" id="newPassword" placeholder="********" onChange={handleChange} value={formData["newPassword"].value}/>
            <div className='icon-font' onClick={changeNewPasswordType}><FontAwesomeIcon icon={newPasswordType ? faEyeSlash : faEye} /></div>
            <small className="error-mesg">{formData["newPassword"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["confirmPassword"].errorClass}`}>
            <label>Confirm Password   <span>*</span>: <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
            <input type={confirmPasswordType ? `password` : `text`} className="form-control" name="confirmPassword" id="confirmPassword" placeholder="********" onChange={handleChange} value={formData["confirmPassword"].value}/>
            <div className='icon-font' onClick={changeConfirmPasswordType}><FontAwesomeIcon icon={confirmPasswordType ? faEyeSlash : faEye} /></div>
            <small className="error-mesg">{formData["confirmPassword"].errorMessage}</small>
          </div>
          <div className='btns-group d-flex justify-content-center'>
            <button type="submit" className="btn btn-primary primary-bg-color border-0 mx-2" onClick={handleFormSubmit}>Update Password</button>
            <Link to="/account" className="btn btn-primary primary-bg-color border-0 mx-2 min-width-100">Cancel</Link>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter> 
    </>
  );
}

export default ChangePassword;