import { useState, useContext } from 'react';
import CryptoJS from "crypto-js";

import Appfooter from '../AppFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import './CreatePatientProfile.css';

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import Select from 'react-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function CreatePatientProfile(){

  const systemContext = useContext(SystemContext);
  const alertContext  = useContext(AlertContext);

  const [isMActive, setIsMActive] = useState(false);

  const handle2Click = () => {
    setIsMActive(!isMActive); // Toggle the state
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const serviceAreaOption = [
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
  ];
  const handleChange1 = (values) => {
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['patient_service_area']: {...formData['patient_service_area'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['patient_service_area']: {...formData['patient_service_area'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };

  const [formData, setFormData] = useState({
    patient_name: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_is_bpl: {required: true, value:"t", errorClass:"", errorMessage:""},
    patient_gender: {required: true, value:"male", errorClass:"", errorMessage:""},
    patient_age: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_education: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"t", errorClass:"", errorMessage:""},
    patient_phone_no: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_whatsapp_no: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_email: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_address: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_landmark: {required: false, value:"", errorClass:"", errorMessage:""},
    patient_city: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_state: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_pincode: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    patient_special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
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

  const resetForm = () => {
    const fieldName = Object.keys(formData);
    setSelectedOptions([]);
    fieldName.forEach((element) => {
      if(element === "gender"){
        formData[element].value         = "male";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
      }
      else if(element === "patient_is_bpl"){
        formData[element].value         = "t";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
      }
      else{
        formData[element].value         = "";
        formData[element].errorClass    = "";
        formData[element].errorMessage  = "";
      }
    })
    setFormData({...formData, ...formData});
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 
    let errorCounter = validateForm();console.log(formData);
    if(errorCounter === 0){

      var decryptedLoginDetails = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem("cred"), ENCYPTION_KEY).toString(CryptoJS.enc.Utf8));

      

    }
  }

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
        if((element === "patient_email") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
          formData[element].errorMessage = "Please enter a valid email!";
          formData[element].errorClass = "form-error";
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

  return(
    <>
      <div className='app-top inner-app-top services-app-top'>
        <div className='app-top-box d-flex align-items-center justify-content-between'>
          <div className='app-top-left d-flex align-items-center'>
            <div className='scroll-back'>
              <Link to="/patientprofiles" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Patient Profiles </h5>
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
      <div className='app-body create-patient-profiles'>
       
        <p><small>Add Patient Information</small></p>
        <form className="mt-3" name="patient_form" id="patient_form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["patient_name"].errorClass}`}>
            <label htmlFor="name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_name" id="patient_name" placeholder="Full Name" onChange={handleChange} value={formData["patient_name"].value ? formData["patient_name"].value : ''}/>
            <small className="error-mesg">{formData["patient_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_is_bpl"].errorClass}`}>
            <label className="no-style"><span className="d-block">BPL/APL? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="patient_is_bpl" id="patient_is_bpl" value={formData["patient_is_bpl"].value} onChange={handleChange}> 
              <option value="t">BPL</option>
              <option value="f">APL</option>
            </select>
            <small className="error-mesg">{formData["patient_is_bpl"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_gender"].errorClass}`}>
            <label className="no-style"><span className="d-block">Gender  <span className="text-danger">*</span></span></label>
            <select className="form-control" name="patient_gender" id="patient_gender" value={formData["patient_gender"].value} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <small className="error-mesg">{formData["patient_gender"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_age"].errorClass}`}>
            <label htmlFor="name">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_age" id="patient_age" placeholder="Age" onChange={handleChange} value={formData["patient_age"].value ? formData["patient_age"].value : ''}/>
            <small className="error-mesg">{formData["patient_age"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_education"].errorClass}`}>
            <label htmlFor="name">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_education" id="patient_education" placeholder="Education" onChange={handleChange} value={formData["patient_education"].value ? formData["patient_education"].value : ''}/>
            <small className="error-mesg">{formData["patient_education"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <select className="form-control" name="is_personal_mobile_number" id="is_personal_mobile_number" value={formData["is_personal_mobile_number"].value} onChange={handleChange}>
              <option value="t">Yes</option>
              <option value="f">No</option>
            </select>
            <small className="error-mesg">{formData["is_personal_mobile_number"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_phone_no"].errorClass}`}>
            <label htmlFor="name">Phone No <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_phone_no" id="patient_phone_no" placeholder="Phone No" onChange={handleChange} value={formData["patient_phone_no"].value ? formData["patient_phone_no"].value : ''}/>
            <small className="error-mesg">{formData["patient_phone_no"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_whatsapp_no"].errorClass}`}>
            <label htmlFor="name">WhatsApp No </label>
            <input type="text" className="form-control" name="patient_whatsapp_no" id="patient_whatsapp_no" placeholder="WhatsApp No" onChange={handleChange} value={formData["patient_whatsapp_no"].value ? formData["patient_whatsapp_no"].value : ''}/>
            <small className="error-mesg">{formData["patient_whatsapp_no"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_email"].errorClass}`}>
            <label htmlFor="name">Email </label>
            <input type="text" className="form-control" name="patient_email" id="patient_email" placeholder="Email" onChange={handleChange} value={formData["patient_email"].value ? formData["patient_email"].value : ''}/>
            <small className="error-mesg">{formData["patient_email"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_address"].errorClass}`}>
            <label htmlFor="name">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_address" id="patient_address" placeholder="Address" onChange={handleChange} value={formData["patient_address"].value ? formData["patient_address"].value : ''}/>
            <small className="error-mesg">{formData["patient_address"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_address_2"].errorClass}`}>
            <label htmlFor="name">Address 2 </label>
            <input type="text" className="form-control" name="patient_address_2" id="patient_address_2" placeholder="Address 2" onChange={handleChange} value={formData["patient_address_2"].value ? formData["patient_address_2"].value : ''}/>
            <small className="error-mesg">{formData["patient_address_2"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_landmark"].errorClass}`}>
            <label htmlFor="name">Landmark </label>
            <input type="text" className="form-control" name="patient_landmark" id="patient_landmark" placeholder="Landmark" onChange={handleChange} value={formData["patient_landmark"].value ? formData["patient_landmark"].value : ''}/>
            <small className="error-mesg">{formData["patient_landmark"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_city"].errorClass}`}>
            <label htmlFor="name">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_city" id="patient_city" placeholder="Village/Town/City" onChange={handleChange} value={formData["patient_city"].value ? formData["patient_city"].value : ''}/>
            <small className="error-mesg">{formData["patient_city"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_state"].errorClass}`}>
            <label htmlFor="name">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_state" id="patient_state" placeholder="State" onChange={handleChange} value={formData["patient_state"].value ? formData["patient_state"].value : ''}/>
            <small className="error-mesg">{formData["patient_state"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_pincode"].errorClass}`}>
            <label htmlFor="name">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="patient_pincode" id="patient_pincode" placeholder="Pincode" onChange={handleChange} value={formData["patient_pincode"].value ? formData["patient_pincode"].value : ''}/>
            <small className="error-mesg">{formData["patient_pincode"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_service_area"].errorClass}`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions} onChange={handleChange1} options={serviceAreaOption} />
            <small className="error-mesg">{formData["patient_service_area"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["patient_special_notes"].errorClass}`}>
            <label htmlFor="name">Special Notes </label>
            <input type="text" className="form-control" name="patient_special_notes" id="patient_special_notes" placeholder="Special Notes" onChange={handleChange} value={formData["patient_special_notes"].value ? formData["patient_special_notes"].value : ''}/>
            <small className="error-mesg">{formData["patient_special_notes"].errorMessage}</small>
          </div>
          <div className='mb-3 mt-3'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Create Profile</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}


export default CreatePatientProfile;