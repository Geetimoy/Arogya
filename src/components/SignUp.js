import './SignUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEye, faQuestionCircle, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
//import serviceplace from "../assets/images/serviceplace-logo.png";
//import footerlogo from "../assets/images/rgvn-logo.png";

import {Link, useNavigate} from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import AlertContext from "../context/alert/AlertContext";
import { useContext, useState, useEffect } from 'react';

import Dropdown from 'react-dropdown-select';
import Select from 'react-select';

import CryptoJS from "crypto-js";
import { API_URL, DEVICE_TYPE, DEVICE_TOKEN } from "./util/Constants";


function SignUp(){

  const redirect = useNavigate();

  const systemContext = useContext(SystemContext);
  const alertContext = useContext(AlertContext);

  const [passwordType, setPasswordType] = useState(true);
  const changePasswordType = () => {
    setPasswordType(!passwordType);
  };

  const convertToMD5 = (str) => {
    const md5Hash = CryptoJS.MD5(str).toString(CryptoJS.enc.Hex);
    return md5Hash;
  };

  const [formData, setFormData] = useState({
    userType: {required: true, value:"", errorClass:"", errorMessage:""},
    userName: {required: true, value:"", errorClass:"", errorMessage:""},
    userId: {required: true, value:"", errorClass:"", errorMessage:""},
    userContactNumber: {required: true, value:"", errorClass:"", errorMessage:""},
    userEmail: {required: true, value:"", errorClass:"", errorMessage:""},
    userPassword: {required: true, value:"", errorClass:"", errorMessage:""},
    userServiceArea: {required: true, value:"", errorClass:"", errorMessage:""}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() !== ""){
      if(name == 'userContactNumber'){
        var regex = /[0-9]|\./;
        if( !regex.test(value) ) {
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"Please enter a valid contact number!"}});
          e.preventDefault();
        }
        else if((value.length < 10)){
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"This is an invalid number!"}});
          e.preventDefault();
        }
        else{
          setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
        }
      }
      else if((name === "userId" || name === "userPassword") && (value.length < 4)){
        setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"form-error", errorMessage:"At least 4 characters are required!"}});
        e.preventDefault();
      }
      else{
        setFormData({...formData, [name]: {...formData[name], value:value, errorClass:"", errorMessage:""}});
      }
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
        var validRegex        = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var validMobileRegex  = /[0-9]|\./;
        if((element === "userEmail") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
          formData[element].errorMessage  = "Please enter a valid email!";
          formData[element].errorClass    = "form-error";
        }
        else if((element === "userContactNumber") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validMobileRegex))){
          formData[element].errorMessage  = "Please enter a valid contact number!";
          formData[element].errorClass    = "form-error";
        }
        else if((element === "userContactNumber") && (formData[element].value.trim() !== "") && (formData[element].value.length < 10)){
          formData[element].errorMessage  = "At least 10 digit are required!";
          formData[element].errorClass    = "form-error";
        }
        else if((element === "userId" || element === "userPassword") && (formData[element].value.trim() !== "") && (formData[element].value.length < 4)){
          formData[element].errorMessage  = "At least 4 characters are required!";
          formData[element].errorClass    = "form-error";
        }
        else{
          formData[element].errorMessage  = "";
          formData[element].errorClass    = "";
        }
      }
    })
    setFormData({...formData, ...formData});
    return errorCounter;
  }

  /*const resetForm = () => {
    Object.keys(formData).forEach((element) => {
      formData[element].value = "";
      formData[element].errorMessage = "";
      formData[element].errorClass = "";
    })
    setFormData({...formData, ...formData});
  }*/

  const [options, setOptions] = useState([
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ]);

  // Define the selectedOptions state and the corresponding setter function
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange1 = (values) => {
    //console.log(values);
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['userServiceArea']: {...formData['userServiceArea'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let errorCounter = validateForm();
    if(errorCounter > 0){
      return false;
    }
    else{

      let jsonData = {};

      jsonData['user_account_type']     = formData['userType'].value;
      jsonData['user_display_name']     = formData['userName'].value;
      jsonData['user_login_id']         = formData['userId'].value;
      jsonData['user_contact_number']   = formData['userContactNumber'].value;
      jsonData['user_email_id']         = formData['userEmail'].value;
      jsonData['user_web_password']     = convertToMD5(formData['userPassword'].value);
      jsonData['system_id']             = systemContext.systemDetails.system_id;
      jsonData['device_type']           = DEVICE_TOKEN;
      jsonData['device_token']          = DEVICE_TYPE;
      jsonData['user_lat']              = localStorage.getItem('latitude');
      jsonData['user_long']             = localStorage.getItem('longitude');
      jsonData['service_area_ids']      = formData['userServiceArea'].value;
      jsonData['account_created_by']    = 'SELF';
      
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      let result = await response.json();
      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        setTimeout(() => {
          redirect('/Signup-Verification/'+formData['userId'].value);
        }, 3000);
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }
    }
  }

  // const handleChange2 = (selected) => {
  //   setSelectedOptions(selected);
  // };

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      getMasterServicesArea();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  useEffect(() => {

  }, [options])

  const getMasterServicesArea = async (e) => {

    let jsonData = {};

    jsonData['system_id']        = systemContext.systemDetails.system_id;
    jsonData["device_type"]      = DEVICE_TYPE;
    jsonData["device_token"]     = DEVICE_TOKEN;
    jsonData["user_lat"]         = localStorage.getItem('latitude');
    jsonData["user_long"]        = localStorage.getItem('longitude');
    jsonData["center_id"]        = 1;

    const response = await fetch(`${API_URL}/masterServiceAreas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    let result = await response.json();

    if(result.data.rows > 0){
      var areas         = result.data.results;
      var optionsArray  = [];
      for(var i=0; i<areas.length; i++){
        optionsArray[i] = {label: areas[i].service_area_name+', '+areas[i].service_area_state, value: areas[i].service_area_id}
      }
      setOptions(optionsArray);
    }

  }
  
  return(
    <div className='container'>
      <div className='login-container'>
        <div className='mt-3'> 
          <Link to="/login"><FontAwesomeIcon icon={faLongArrowAltLeft} /></Link>
          <span className='m-2'>Sign Up</span>
        </div>
        <div className='login-box signup'>
          <img src={systemContext.systemDetails.thp_app_logo_url} className="m-auto mb-3" alt={systemContext.systemDetails.thp_system_name} />
          
          <p>Create an account to continue your all activities</p>
          <form className='select-box' onSubmit={handleFormSubmit}>
            <p className='text-end mandatory'><span className='text-danger'>*</span> marks are mandatory</p>
            <div className={`form-group ${formData["userType"].errorClass}`}>
              <label htmlFor="userType"> Register As <span className='text-danger'> *</span></label>
              <select className="form-control" id="userType" name="userType" onChange={handleChange} defaultValue={formData["userType"].value}>
                <option value="">Select</option>
                <option value="3">Patient</option>
                <option value="31">Child Malnutrition</option>
                <option value="32">Young Womens</option>
                <option value="33">Janani</option>
                <option value="4">Volunteer - MedTech</option>
                <option value="5">Doctor</option>
                {/* <option value="6">Pharmacy</option> */}
              </select>
              <small className="error-mesg">{formData["userType"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["userName"].errorClass}`}>
              <label htmlFor="userName"> Name <span className='text-danger'> *</span></label>
              <input type="text" id="userName" name="userName" className='form-control' placeholder='Enter Name' value={formData["userName"].value} onChange={handleChange}/>
              <small className="error-mesg">{formData["userName"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["userId"].errorClass}`}>
              <label htmlFor="userId"> User ID <span className='text-danger'> *</span></label>
              <input type="text" id="userId" name="userId" className='form-control' placeholder='Enter user id' value={formData["userId"].value} onChange={handleChange}/>
              <small className="error-mesg">{formData["userId"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["userContactNumber"].errorClass}`}>
              <label htmlFor="userContactNumber"> Contact Number/Mobile Number <span className='text-danger'> *</span></label>
              <input type="text" id="userContactNumber" name="userContactNumber" className='form-control' placeholder='Enter contact or mobile number' value={formData["userContactNumber"].value} onChange={handleChange} maxLength={10}/>
              <small className="error-mesg">{formData["userContactNumber"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["userEmail"].errorClass}`}>
              <label htmlFor="userEmail"> Email ID <span className='text-danger'> *</span></label>
              <input type="text" id="userEmail" name="userEmail" className='form-control' placeholder='Enter email id' value={formData["userEmail"].value} onChange={handleChange}/>
              <small className="error-mesg">{formData["userEmail"].errorMessage}</small>
            </div>
            <div className={`form-group ${formData["userPassword"].errorClass}`}>
              <label htmlFor="userPassword"> Password <span className='text-danger'> *</span> <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
              <input type={passwordType ? `password` : `text`} id="userPassword" name="userPassword" className='form-control' placeholder='Enter Password' value={formData["userPassword"].value} onChange={handleChange}/>
              <div className='icon-font' onClick={changePasswordType}><FontAwesomeIcon icon={passwordType ? faEyeSlash : faEye} /></div>
              <small className="error-mesg">{formData["userPassword"].errorMessage}</small>
            </div>
            {/* <div className={`form-group ${formData["userServiceArea"].errorClass}`}>
              <label htmlFor="userServiceArea"> Area <span className='text-danger'> *</span></label>
              <select className="form-control" id="userServiceArea" multiple name="userServiceArea" onChange={handleChange} defaultValue={formData["userServiceArea"].value}>
                <option selected value="1">Guwahati Zoo,Fancy bazar</option>
                <option value="2">Navagraha Temple, Guwahati</option>
                <option value="3">Umananda Temple, Guwahati</option>
                <option value="4">Morigaon</option>
              </select>
              <small className="error-mesg">{formData["userServiceArea"].errorMessage}</small>
            </div> */}
            <div className={`form-group ${formData["userServiceArea"].errorClass}`}>
              <label>Area <span className='text-danger'> *</span></label>
              {/* <Dropdown className='form-control select-multi' multi options={options} values={selectedOptions} onChange={handleChange1} /> */}
              <Select className='form-control select-multi' isMulti value={selectedOptions}
        onChange={handleChange1} options={options} />
              <small className="error-mesg">{formData["userServiceArea"].errorMessage}</small>
            </div>
            

            
            {/* <div className='form-group'>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="smart_menu" className="checkbox style-0 custom-control-input" />
                  <label className="custom-control-label" htmlFor="smart_menu">
                    <span>I agree to <Link to = "/termscondition" className='primary-color'>Terms and Condition</Link></span>
                  </label>
              </div>
            </div> */}
            <div className='mb-3 mt-3'>
              {/* <Link to ="/signup" className='m-auto text-light text-decoration-none d-block'>Register</Link> */}
              <button type="submit" className='btn primary-bg-color text-light w-100 border-0'>Register</button>
            </div>
            <div>
              <p>By registering you read & agreed to the RGVN & ServicePlace <Link to ="/termsofuse" className='primary-color'>Terms of Use</Link> & <Link to="/disclaimer" className='primary-color'>Disclaimer</Link></p>
            </div>
            <p className="text-center link-red mb-3">
              Already have an account ?
              <Link to="/login" className="primary-color mx-1">
                Login
              </Link>
            </p>
            <p className="text-center link-red mb-3">
              Having Trouble? 
              <Link to="/contact-admin" className="primary-color mx-1">
                Contact Admin
              </Link>
            </p>
            <p className='text-center'>&copy; {(new Date().getFullYear())} {systemContext.systemDetails.thp_domain_name}.  {(systemContext.systemDetails.thp_system_id > 0) && <span>Powered by <Link to={systemContext.systemDetails.thp_sp_global_url} target="_blank" className="primary-color">{systemContext.systemDetails.thp_sp_global_name}</Link></span>}</p>
            <div className="text-center login-logo">
              {(systemContext.systemDetails.thp_system_id > 0) && <Link to={systemContext.systemDetails.thp_main_ngo_url} target='_blank'><img
                src={systemContext.systemDetails.thp_ngo_logo_url}
                style={{ height: "80px" }}
                className="mx-3"
                alt={systemContext.systemDetails.thp_system_name}
              /></Link>}
              <Link to={systemContext.systemDetails.thp_sp_global_url} target="_blank"><img
                src={systemContext.systemDetails.thp_sp_global_logo_url}
                style={{ height: "80px" }}
                className="mx-3"
                alt={systemContext.systemDetails.thp_system_name}
              /></Link>
            </div>
          </form>
          {/* <div className='back-to-login'>
            Already have an account? <Link to="/login" className='primary-color'> Log In</Link>
          </div> */}
        </div>
        
      </div>
    </div>
  );
}

export default SignUp;