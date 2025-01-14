import { useState, useContext, useEffect } from 'react';
import CryptoJS from "crypto-js";
import Appfooter from "../AppFooter";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEllipsisV, faBell, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';

import  './ElderPersons.css';
import Select from 'react-select';

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";

function CreateElderPerson(){

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
    elder_name: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_guardian: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_gender: {required: true, value:"male", errorClass:"", errorMessage:""},
    elder_age: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"t", errorClass:"", errorMessage:""},
    elder_phone_no: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_whatsapp_no: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_email: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_address: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_landmark: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_city: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_state: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_pincode: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_education: {required: true, value:"", errorClass:"", errorMessage:""},
    elder_sub_volunteer: {required: false, value:"", errorClass:"", errorMessage:""},
    elder_special_notes: {required: false, value:"", errorClass:"", errorMessage:""}
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

      let jsonData = {};
      jsonData['system_id']                 = systemContext.systemDetails.system_id;
      jsonData["introducer_account_key"]    = decryptedLoginDetails.account_key;
      jsonData["introducer_account_type"]   = decryptedLoginDetails.account_type;
      jsonData["user_login_id"]             = decryptedLoginDetails.login_id;
      jsonData["device_type"]               = DEVICE_TYPE; //getDeviceType();
      jsonData["device_token"]              = DEVICE_TOKEN;
      jsonData["user_lat"]                  = localStorage.getItem('latitude');
      jsonData["user_long"]                 = localStorage.getItem('longitude');

      var serviceArea                       = '{'+formData['patient_service_area'].value+'}';

      jsonData["patient_name"]              = formData['patient_name'].value;
      jsonData["patient_father_name"]       = formData['patient_father_name'].value;
      jsonData["patient_contact_number"]    = formData['patient_phone_no'].value;
      jsonData["patient_whatsup_number"]    = formData['patient_whatsapp_no'].value;
      jsonData["patient_email_id"]          = formData['patient_email'].value;
      jsonData["patient_age"]               = formData['patient_age'].value;
      jsonData["patient_gender"]            = formData['patient_gender'].value;
      jsonData["patient_address"]           = formData['patient_address'].value;
      jsonData["patient_address_2"]         = formData['patient_address_2'].value;
      jsonData["patient_state"]             = formData['patient_state'].value;
      jsonData["patient_postal_code"]       = formData['patient_pincode'].value;
      jsonData["patient_landmark"]          = formData['patient_landmark'].value;
      jsonData["patient_city"]              = formData['patient_city'].value;
      jsonData["is_bpl"]                    = formData['patient_is_bpl'].value;
      jsonData["is_your_personal_number"]   = formData['is_personal_mobile_number'].value;
      jsonData["patient_education"]         = formData['patient_education'].value;
      jsonData["special_note"]              = formData['patient_special_notes'].value;
      jsonData["service_area"]              = serviceArea;

      const response = await fetch(`${API_URL}/addUpdatePatientProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });
      
      let result = await response.json();

      if(result.success){
        alertContext.setAlertMessage({show:true, type: "success", message: result.msg});
        resetForm();
      }
      else{
        alertContext.setAlertMessage({show:true, type: "error", message: result.msg});
      }

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
              <Link to="/elder-persons" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Elder Person Profile</h5>
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
      <div className='app-body form-all create-elder-person'>
        <p><small>Add Elder Person Informations</small></p>
        <form className="mt-3 select-box" name="elder_person_form" id="elder_person_form">
          <div className="form-group">
            <label htmlFor="elder_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_name" id="elder_name" placeholder="Full Name" value="" />
          </div>
          <div className="form-group">
            <label htmlFor="woman_father_name">Name of Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control"  name="elder_guardian_name" id="elder_guardian_name" value="" placeholder="Name of Guardian" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_occupation">Occupation <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_occupation" id="elder_occupation" placeholder="Occupation" />
          </div>
          <div className="form-group">
            <label><span className="d-block">Gender  </span></label>
            <select className="form-control" value="" name="gender" id="gender">
              <option value="0">Select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="elder_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_age" id="elder_age" placeholder="Age" />
          </div>
          <div className="form-group">
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" />
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f"/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="elder_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" value="" name="elder_contact_number" id="elder_contact_number" placeholder="Phone No" />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" name="whatsapp" id="whatsapp" placeholder="WhatsApp No" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_email_id">Email </label>
            <input type="text" className="form-control" value="" name="elder_email_id" id="elder_email_id" placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_address" id="elder_address" placeholder="Address" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_address_2">Address 2 </label>
            <input type="text" className="form-control" value="" name="elder_address_2" id="elder_address_2" placeholder="Address 2" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_landmark" id="elder_landmark" placeholder="Landmark" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_city" id="elder_city" placeholder="Village/Town/City" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_state" id="elder_state" placeholder="State" />
          </div>
          <div className="form-group">
            <label htmlFor="elder_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_postal_code" id="elder_postal_code" placeholder="Pincode" />
          </div>
          <div className="form-group">
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions}
         options={serviceAreaOption} />
          </div>
          <div className="form-group">
            <label htmlFor="elder_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" value="" name="elder_education" id="elder_education" placeholder="Education" />
          </div>
          <div className="form-group ">
            <label htmlFor="sub_volunteer_name">Sub Volunteer Name</label>
            <select className="form-control" name="sub_volunteer_name" id="sub_volunteer_name">
              <option value="1">Sub Volunteer1</option>
              <option value="2">Sub Volunteer2</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" value="" name="special_note" id="special_note" placeholder="Special Notes" />
          </div>
          <div className='mb-3 mt-3 text-center'>
            <button type="submit" className='btn primary-bg-color text-light'>Create Elder Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  );
}

export default CreateElderPerson;