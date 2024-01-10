import './SignUp.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft, faEye, faQuestionCircle, faKey, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//import logotelehealth from "../assets/images/rgvn-telehealth-logo.png";
//import serviceplace from "../assets/images/serviceplace-logo.png";
//import footerlogo from "../assets/images/rgvn-logo.png";

import {Link} from "react-router-dom";
import SystemContext from "../context/system/SystemContext";
import { useContext, useState } from 'react';
import CryptoJS from "crypto-js";

function SignUp(){

  const systemContext = useContext(SystemContext);

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
          <img src={systemContext.systemDetails.thp_app_logo_url} className="m-auto mb-3" alt="logo" />
          <h5 className='title'>Getting Started</h5>
          <p>Create an account to continue your all activities</p>
          <form onSubmit={handleFormSubmit}>
            <p className='text-end mandatory'><span className='text-danger'>*</span> marks are mandatory</p>
            <div className='form-group'>
              <label htmlFor="userType"> Register As <span className='text-danger'> *</span></label>
              <select className="form-control" id="userType" name="userType" onChange={handleChange} defaultValue={formData["userType"].value}>
                <option value="">Select</option>
                <option value="3">Patient</option>
                <option value="4">Volunteer - MedTech</option>
                <option value="5">Doctor</option>
                <option value="6">Pharmacy</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="userName"> Name <span className='text-danger'> *</span></label>
              <input type="text" id="userName" name="userName" className='form-control' placeholder='Enter Name' value={formData["userName"].value} onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor="userId"> User ID <span className='text-danger'> *</span></label>
              <input type="text" id="userId" name="userId" className='form-control' placeholder='Enter user id' value={formData["userId"].value} onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor="userContactNumber"> Contact Number/Mobile Number <span className='text-danger'> *</span></label>
              <input type="text" id="userContactNumber" name="userContactNumber" className='form-control' placeholder='Enter contact or mobile number' value={formData["userContactNumber"].value} onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor="userEmail"> Email ID <span className='text-danger'> *</span></label>
              <input type="text" id="userEmail" name="userEmail" className='form-control' placeholder='Enter email id' value={formData["userEmail"].value} onChange={handleChange}/>
            </div>
            <div className='form-group'>
              <label htmlFor="userPassword"> Web Password/PIN <span className='text-danger'> *</span> <FontAwesomeIcon icon={faKey} /> <FontAwesomeIcon icon={faQuestionCircle} /></label>
              <input type={passwordType ? `password` : `text`} id="userPassword" name="userPassword" className='form-control' placeholder='Enter Password' value={formData["userPassword"].value} onChange={handleChange}/>
              <div className='icon-font' onClick={changePasswordType}><FontAwesomeIcon icon={passwordType ? faEyeSlash : faEye} /></div>
            </div>
            <div className='form-group'>
              <label htmlFor="userServiceArea"> Area <span className='text-danger'> *</span></label>
              <select className="form-control" id="userServiceArea" name="userServiceArea" onChange={handleChange} defaultValue={formData["userServiceArea"].value}>
                <option value="">Select</option>
                <option value="1">Guwahati Zoo,Fancy bazar</option>
                <option value="2">Navagraha Temple, Guwahati</option>
                <option value="3">Umananda Temple, Guwahati</option>
                <option value="4">Morigaon</option>
              </select>
            </div>
            {/* <div className='form-group'>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="smart_menu" className="checkbox style-0 custom-control-input" />
                  <label className="custom-control-label" htmlFor="smart_menu">
                    <span>I agree to <Link to = "/termscondition" className='primary-color'>Terms and Condition</Link></span>
                  </label>
              </div>
            </div> */}
            <div className='btn primary-bg-color mb-3 mt-3 w-100'>
              <Link to ="/signup" className='m-auto text-light text-decoration-none d-block'>Register</Link>
            </div>
            <div>
              <p>By registering you read & agreed to the RGVN & ServicePlace <Link to ="/termscondition" className='primary-color'>Terms of Use</Link> & <Link to="/disclaimer" className='primary-color'>Disclaimer</Link></p>
            </div>
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
            <p className='text-center'>&copy; 2024 rgvn.org. Powered by <Link to="https://www.serviceplace.org/" target="_blank" className="primary-color">ServicePlace.Org</Link></p>
            <div className="text-center login-logo">
              <img
                src={systemContext.systemDetails.thp_ngo_logo_url}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
              <img
                src={systemContext.systemDetails.thp_sp_global_logo_url}
                style={{ height: "80px" }}
                className="mx-3"
                alt=""
              />
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