import { useState, useContext, useEffect } from 'react';
import Appfooter from "../AppFooter";
import CryptoJS from "crypto-js";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faKey, faEyeSlash, faEye, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import AppTopNotifications from '../AppTopNotifications';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function CreateServiceProviders(){

   const systemContext = useContext(SystemContext);
   const alertContext  = useContext(AlertContext);
   const [isMActive, setIsMActive] = useState(false);
   const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [formData, setFormData] = useState({
    is_consent: {required:false, value:"2", errorClass:"", errorMessage:""},
    elder_name: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_gender: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_age: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_contact_number: {required: true, value:"", errorClass:"", errorMessage:""},
    whatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_email_id: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_address: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_landmark: {required: true, value:"", errorClass:"", errorMessage:""},

    elder_city: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_state: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_education: {required: true, value:"", errorClass:"", errorMessage:""},
    special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
  });

   const resetForm = () => {
    const fieldName = Object.keys(formData);
    // setSelectedOptions([]);
    fieldName.forEach((element) => {
      if(element === "elder_gender" || element === "toilet_type" || element === "house_type" || element === "drinking_water_type"){
        formData[element].value         = "1";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
        formData[element].required      = formData[element].required;
      }
      else if(element === "is_consent"){
        formData[element].value         = "1";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
        formData[element].required      = formData[element].required;
      }
      else{
        formData[element].value         = "";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
        formData[element].required      = formData[element].required;
      }
    })
    setFormData({...formData, ...formData});
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault();
     let errorCounter = validateForm();console.log(formData);
        if(errorCounter === 0){
    
          var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));
    
          let jsonData = {};
          jsonData['system_id']                 = systemContext.systemDetails.system_id;
          jsonData["volunteer_account_type"]    = decryptedLoginDetails.account_key;
          jsonData["volunteer_account_key"]   = decryptedLoginDetails.account_type;
          // jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
          jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
          jsonData["device_token"]              = DEVICE_TOKEN;
          jsonData["user_lat"]                  = localStorage.getItem('latitude');
          jsonData["user_long"]                 = localStorage.getItem('longitude');
    
          var serviceArea                       = '{'+formData['elder_service_area'].value+'}';
    
         
          jsonData["provider_id"]                = formData['provider_id'].value;
          jsonData["name"]                       = formData['test'].value;
          jsonData["location"]                   = formData['Test data'].value;
          jsonData["contact_number"]             = formData['9874563210'].value;
          jsonData["services"]                   = formData['"test,test1'].value;
          jsonData["id"]                         = formData['18'].value;
          
          // jsonData["service_area"]              = serviceArea;
    
          const response = await fetch(`${API_URL}/saveServiceProviderByVolunteer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
          });
          console.log(response)
          let result = await response.json();
    
          if(result.success){
            alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
            resetForm();
          }
          else{
            alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
          }
    
    
    
        }
  };
  const validateForm = () => {
    const fieldName = Object.keys(formData);
    let errorCounter = 0;
    fieldName.forEach((element) => {
      if(formData[element].required && (formData[element].value === "" || formData[element].value === null)){
        formData[element].errorMessage = "This field is required!";
        formData[element].errorClass = "form-error";
        errorCounter++;
      }
      else{
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if((element === "woman_email_id") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
          formData[element].errorMessage = "Please enter a valid email!";
          formData[element].errorClass = "form-error";
        }
        else{
          formData[element].errorMessage = "";
          formData[element].errorClass = "";
        }
      }
      formData[element].required = formData[element].required;
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/service-providers" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Service Provider </h5>
          </div>
          <div className='app-top-right d-flex'> 
            <AppTopNotifications />
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
      <div className='app-body'>
        <div className='service-providers signup login-box p-0 mt-0'>
          <p>Create a Service Provider account </p>
          <form className='select-box' onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="userType"> Service Area <span className='text-danger'> *</span></label>
                <select className="form-control" id="userType" name="userType">
                  <option value="">Select</option>
                  <option value="3">Prefered Hospital</option>
                  <option value="31">Clinic Nursing Home</option>
                  <option value="32">Pathology</option>
                  <option value="33">Pharmacy</option>
                  <option value="4">Nurse Care</option>
                  <option value="5">In Home Care</option>
                  {/* <option value="6">Pharmacy</option> */}
                </select>
                {/* <small className="error-mesg">{formData["userType"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userName"> Name <span className='text-danger'> *</span></label>
                <input type="text" id="userName" name="userName" className='form-control' placeholder='Enter Name' />
                {/* <small className="error-mesg">{formData["userName"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userId"> User ID <span className='text-danger'> *</span></label>
                <input type="text" id="userId" name="userId" className='form-control' placeholder='Enter user id' />
                {/* <small className="error-mesg">{formData["userId"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userContactNumber"> Contact Number/Mobile Number <span className='text-danger'> *</span></label>
                <input type="text" id="userContactNumber" name="userContactNumber" className='form-control' placeholder='Enter contact or mobile number'/>
                {/* <small className="error-mesg">{formData["userContactNumber"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userEmail"> Email ID <span className='text-danger'> *</span></label>
                <input type="text" id="userEmail" name="userEmail" className='form-control' placeholder='Enter email id' />
                {/* <small className="error-mesg">{formData["userEmail"].errorMessage}</small> */}
              </div>
              <div className="form-group">
                <label htmlFor="userPassword"> Password <span className='text-danger'> *</span></label>
                <input type="password" id="userPassword" name="userPassword" className='form-control' placeholder='Enter Password' />
                <div className='icon-font'><FontAwesomeIcon  /></div>
                {/* <small className="error-mesg">{formData["userPassword"].errorMessage}</small> */}
              </div>
               <div className='mb-3 mt-3'>
                <button type="submit" className='btn primary-bg-color text-light w-100 border-0'>Register</button>
              </div>
          </form>
        </div>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default CreateServiceProviders;