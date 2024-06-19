import { useState, useContext } from 'react';
import CryptoJS from "crypto-js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faLongArrowAltLeft, faBell } from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import SystemContext from "../../context/system/SystemContext";
import AlertContext from '../../context/alert/AlertContext';
import Appfooter from '../AppFooter';
import Dropdown from 'react-dropdown-select';
import  './CreateYoungWoman.css'

import { API_URL, ENCYPTION_KEY, DEVICE_TYPE, DEVICE_TOKEN } from "../util/Constants";


function CraeteYoungWomen(){

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
      setFormData({...formData, ['woman_service_area']: {...formData['woman_service_area'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['woman_service_area']: {...formData['woman_service_area'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };
  

  const [formData, setFormData] = useState({
    woman_name: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_father_name: {required: true, value:"", errorClass:"", errorMessage:""},
    is_premature_birth: {required: true, value:"", errorClass:"", errorMessage:""},
    gender: {required: true, value:"1", errorClass:"", errorMessage:""},
    woman_father_occupation: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_age: {required: true, value:"", errorClass:"", errorMessage:""},
    is_personal_mobile_number: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_contact_number: {required: true, value:"", errorClass:"", errorMessage:""},
    whatsapp: {required: false, value:"", errorClass:"", errorMessage:""},
    woman_email_id: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_address: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_address_2: {required: false, value:"", errorClass:"", errorMessage:""},
    woman_landmark: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_city: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_state: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_postal_code: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_service_area: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_education: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_name: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_class: {required: true, value:"", errorClass:"", errorMessage:""},
    woman_school_section: {required: true, value:"", errorClass:"", errorMessage:""},
    toilet_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    house_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    drinking_water_type: {required: true, value:"1", errorClass:"", errorMessage:""},
    special_note: {required: false, value:"", errorClass:"", errorMessage:""}
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
      if(element === "gender" || element === "toilet_type" || element === "house_type" || element === "drinking_water_type"){
        formData[element].value         = "1";
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
    let errorCounter = validateForm();
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

      var serviceArea                       = '{'+formData['woman_service_area'].value+'}';

      jsonData["woman_name"]                = formData['woman_name'].value;
      jsonData["woman_contact_number"]      = formData['woman_contact_number'].value;
      jsonData["woman_email_id"]            = formData['woman_email_id'].value;
      jsonData["woman_body_height"]         = '0';
      jsonData["woman_body_weight"]         = '0';
      jsonData["woman_age"]                 = formData['woman_age'].value;
      jsonData["woman_address"]             = formData['woman_address'].value;
      jsonData["woman_address_2"]           = formData['woman_address_2'].value;
      jsonData["woman_state"]               = formData['woman_state'].value;
      jsonData["woman_postal_code"]         = formData['woman_postal_code'].value;
      jsonData["woman_landmark"]            = formData['woman_landmark'].value;
      jsonData["woman_city"]                = formData['woman_city'].value;
      jsonData["woman_father_name"]         = formData['woman_father_name'].value;
      jsonData["woman_education"]           = formData['woman_education'].value;
      jsonData["woman_school_name"]         = formData['woman_school_name'].value;
      jsonData["woman_school_class"]        = formData['woman_school_class'].value;
      jsonData["woman_school_section"]      = formData['woman_school_section'].value;
      jsonData["toilet_type"]               = formData['toilet_type'].value;
      jsonData["house_type"]                = formData['house_type'].value;
      jsonData["drinking_water_type"]       = formData['drinking_water_type'].value;
      jsonData["is_premature_birth"]        = formData['is_premature_birth'].value;
      jsonData["is_bpl"]                    = 'f';
      jsonData["woman_father_occupation"]   = formData['woman_father_occupation'].value;
      jsonData["is_your_personal_number"]   = formData['is_personal_mobile_number'].value;
      jsonData["special_note"]              = formData['special_note'].value;
      jsonData["woman_whatsup_number"]      = formData['whatsapp'].value;
      jsonData["service_area"]              = serviceArea;

      const response = await fetch(`${API_URL}/addUpdateWomanProfile`, {
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
        if((element === "woman_email_id") && (formData[element].value.trim() !== "") && (!formData[element].value.match(validRegex))){
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
              <Link to="/youngwomens" className=''>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
              </Link>
            </div>
            <h5 className='mx-2 mb-0'>Create Young Women Profile </h5>
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
      <div className='app-body form-all create-young-woman'>
       
        <p><small>Add Young Women Informations</small></p>
        <form className="mt-3" name="young_women_form" id="young_women_form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["woman_name"].errorClass}`}>
            <label htmlFor="woman_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} name="woman_name" id="woman_name" placeholder="Full Name" value={formData["woman_name"].value ? formData["woman_name"].value : ''}/>
            <small className="error-mesg">{formData["woman_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_father_name"].errorClass}`}>
            <label htmlFor="woman_father_name">Name of Parent/Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} name="woman_father_name" id="woman_father_name" value={formData["woman_father_name"].value ? formData["woman_father_name"].value : ''} placeholder="Name of Parent/Guardian" />
            <small className="error-mesg">{formData["woman_father_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_premature_birth"].errorClass}`}>
            <label htmlFor="premature_birth" className='no-style'>Premature Birth? <span className="text-danger">*</span></label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_y" name="is_premature_birth" value="t" className="custom-control-input" onChange={handleChange} checked={(formData["is_premature_birth"].value === 't') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="premature_birth_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="premature_birth_n" name="is_premature_birth" value="f" className="custom-control-input" onChange={handleChange} checked={(formData["is_premature_birth"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="premature_birth_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_premature_birth"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_father_occupation"].errorClass}`}>
            <label htmlFor="woman_father_occupation">Occupation of Guardian <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="woman_father_occupation" id="woman_father_occupation" onChange={handleChange} value={formData["woman_father_occupation"].value ? formData["woman_father_occupation"].value : ''} placeholder="Occupation of Guardian" />
            <small className="error-mesg">{formData["woman_father_occupation"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["gender"].errorClass}`}>
            <label><span className="d-block">Gender  </span></label>
            <select className="form-control" value={formData["gender"].value} name="gender" id="gender" onChange={handleChange}>
              <option value="1">Female</option>
            </select>
            <small className="error-mesg">{formData["gender"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_age"].errorClass}`}>
            <label htmlFor="woman_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_age"].value ? formData["woman_age"].value : ''} name="woman_age" id="woman_age" placeholder="Age" />
            <small className="error-mesg">{formData["woman_age"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is your personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 't') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_personal_mobile_number"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_contact_number"].errorClass}`}>
            <label htmlFor="woman_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" onChange={handleChange} value={formData["woman_contact_number"].value ? formData["woman_contact_number"].value : ''} name="woman_contact_number" id="woman_contact_number" placeholder="Phone No" />
            <small className="error-mesg">{formData["woman_contact_number"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["whatsapp"].errorClass}`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" onChange={handleChange} value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} name="whatsapp" id="whatsapp" placeholder="WhatsApp No" />
            <small className="error-mesg">{formData["whatsapp"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_email_id"].errorClass}`}>
            <label htmlFor="woman_email_id">Email </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_email_id"].value ? formData["woman_email_id"].value : ''} name="woman_email_id" id="woman_email_id" placeholder="Email" />
            <small className="error-mesg">{formData["woman_email_id"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_address"].errorClass}`}>
            <label htmlFor="woman_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_address"].value ? formData["woman_address"].value : ''} name="woman_address" id="woman_address" placeholder="Address" />
            <small className="error-mesg">{formData["woman_address"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_address_2"].errorClass}`}>
            <label htmlFor="woman_address_2">Address 2 </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_address_2"].value ? formData["woman_address_2"].value : ''} name="woman_address_2" id="woman_address_2" placeholder="Address 2" />
            <small className="error-mesg">{formData["woman_address_2"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_landmark"].errorClass}`}>
            <label htmlFor="woman_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_landmark"].value ? formData["woman_landmark"].value : ''} name="woman_landmark" id="woman_landmark" placeholder="Landmark" />
            <small className="error-mesg">{formData["woman_landmark"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_city"].errorClass}`}>
            <label htmlFor="woman_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_city"].value ? formData["woman_city"].value : ''} name="woman_city" id="woman_city" placeholder="Village/Town/City" />
            <small className="error-mesg">{formData["woman_city"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_state"].errorClass}`}>
            <label htmlFor="woman_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_state"].value ? formData["woman_state"].value : ''} name="woman_state" id="woman_state" placeholder="State" />
            <small className="error-mesg">{formData["woman_state"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_postal_code"].errorClass}`}>
            <label htmlFor="woman_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_postal_code"].value ? formData["woman_postal_code"].value : ''} name="woman_postal_code" id="woman_postal_code" placeholder="Pincode" />
            <small className="error-mesg">{formData["woman_postal_code"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_service_area"].errorClass}`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Dropdown className='form-control select-multi' multi options={serviceAreaOption} values={selectedOptions} onChange={handleChange1}/>
            <small className="error-mesg">{formData["woman_service_area"].errorMessage}</small>
          </div>
          <div className={`d-none form-group ${formData["woman_education"].errorClass}`}>
            <label htmlFor="woman_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_education"].value ? formData["woman_education"].value : ''} name="woman_education" id="woman_education" placeholder="Education" />
            <small className="error-mesg">{formData["woman_education"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_school_name"].errorClass}`}>
            <label htmlFor="woman_school_name">School Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_school_name"].value ? formData["woman_school_name"].value : ''} name="woman_school_name" id="woman_school_name" placeholder="School Name" />
            <small className="error-mesg">{formData["woman_school_name"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_school_class"].errorClass}`}>
            <label htmlFor="woman_school_class">Class <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_school_class"].value ? formData["woman_school_class"].value : ''} name="woman_school_class" id="woman_school_class" placeholder="Class" />
            <small className="error-mesg">{formData["woman_school_class"].errorMessage}</small>
          </div>
          <div className={`form-group ${formData["woman_school_section"].errorClass}`}>
            <label htmlFor="woman_school_section">Section <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["woman_school_section"].value ? formData["woman_school_section"].value : ''} name="woman_school_section" id="woman_school_section" placeholder="Section" />
            <small className="error-mesg">{formData["woman_school_section"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["house_type"].errorClass}`}>
            <label htmlFor="house_type">House<span className="text-danger">*</span></label>
            <select className="form-control" value={formData["house_type"].value} name="house_type" id="house_type" onChange={handleChange}>
              <option value="1">Mud House</option>
              <option value="2">Paved House</option>
            </select>
            <small className="error-mesg">{formData["house_type"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["drinking_water_type"].errorClass}`}>
            <label htmlFor="drinking_water_type">Drinking Water<span className="text-danger">*</span></label>
            <select className="form-control" value={formData["drinking_water_type"].value} name="drinking_water_type" id="drinking_water_type" onChange={handleChange}>
              <option value="1">Tap</option>
              <option value="2">Well</option>
              <option value="3">Pond</option>
            </select>
            <small className="error-mesg">{formData["drinking_water_type"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["toilet_type"].errorClass}`}>
            <label htmlFor="toilet_type">Toilet<span className="text-danger">*</span></label>
            <select className="form-control" value={formData["toilet_type"].value} name="toilet_type" id="toilet_type" onChange={handleChange}>
              <option value="1">Open-field</option>
              <option value="2">Country-latrine</option>
              <option value="3">Flush-toilet</option>
            </select>
            <small className="error-mesg">{formData["toilet_type"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["special_note"].errorClass}`}>
            <label htmlFor="special_note">Special Notes </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["special_note"].value ? formData["special_note"].value : ''} name="special_note" id="special_note" placeholder="Special Notes" />
            <small className="error-mesg">{formData["special_note"].errorMessage}</small>
          </div>

          <div className='mb-3 mt-3'>
            <button type="submit" className='btn primary-bg-color text-light w-100'>Create Young Women Profiles</button>
          </div>
        </form>
      </div>
      <Appfooter></Appfooter>
    </>
  )
}


export default CraeteYoungWomen;