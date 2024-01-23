
import './Verification.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";
import { useParams, useNavigate } from 'react-router-dom';

function Verification(){


  //const { loginId } = useParams();
  const [urlParam, setUrlParam] = useState(useParams());
  const redirect    = useNavigate();

  useEffect(() => {
    if(urlParam.loginId){
      
    }
    else{
      redirect('/forgotpassword');
    }
    // eslint-disable-next-line
  }, [urlParam])

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [formData, setFormData] = useState({
    digit1: {required: true, value:""},
    digit2: {required: true, value:""},
    digit3: {required: true, value:""},
    digit4: {required: true, value:""}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: {...formData[name], value:value}});
  }

  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && formData[element].value.trim() === ""){
        errorCounter++;
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let errorCounter = validateForm();
    if(errorCounter > 0){
      alertContext.setAlertMessage({show:true, type: "error", message: "Please enter a valid code"});
      return false;
    }
    else{

      var otp = formData['digit1'].value+''+formData['digit2'].value+''+formData['digit3'].value+''+formData['digit4'].value;
      otp = parseInt(otp);

      let jsonData = {};

      jsonData['system_id']     = systemContext.systemDetails.system_id;
      jsonData['device_type']   = DEVICE_TYPE;
      jsonData['device_token']  = DEVICE_TOKEN;
      jsonData['user_lat']      = localStorage.getItem('latitude');
      jsonData['user_long']     = localStorage.getItem('longitude');
      jsonData['user_login_id'] = urlParam.loginId;
      jsonData['otp']           = otp;
      
      const response = await fetch(`${API_URL}/forgotPasswordValidateOTP`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();
      
      if (result.success) {
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
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
            <Link to="/forgotpassword"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
            <span className='m-2'>Verification</span>
          </div>
          <div className='login-box verification'>
            <h5 className='title'>Verify Code</h5>
            <p>Kindly Enter the 4 digit verification code</p>
            <form onSubmit={handleFormSubmit}>
              <div className='d-flex justify-content-around'>
                <input type="text" maxLength="1" name="digit1" id="digit1" onChange={handleChange} value={formData["digit1"].value}/>
                <input type="text" maxLength="1" name="digit2" id="digit2" onChange={handleChange} value={formData["digit2"].value}/>
                <input type="text" maxLength="1" name="digit3" id="digit3" onChange={handleChange} value={formData["digit3"].value}/>
                <input type="text" maxLength="1" name="digit4" id="digit4" onChange={handleChange} value={formData["digit4"].value}/>
              </div>
              <div className='btn primary-bg-color mb-5 mt-5 w-100'>
                <button type="submit" className='btn primary-bg-color text-light w-100'>VERIFY</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );

}

export default Verification;