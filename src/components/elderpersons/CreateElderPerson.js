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
  const [serviceAreaOption, setServiceAreaOption] = useState([
    { label: 'Guwahati Zoo,Fancy bazar', value: '1' },
    { label: 'Navagraha Temple, Guwahati', value: '2' },
    { label: 'Umananda Temple, Guwahati', value: '3' },
    { label: 'Morigaon', value: '4' },
    { label: 'Saparam Bera', value: '5' }
  ]);
  const handleChange1 = (values) => {
    var selectedArea = [];
    if(values.length > 0){
      values.forEach((item, index) => {
        selectedArea.push(item.value);
      })
    }
    if(selectedArea.length > 0){
      setFormData({...formData, ['elder_service_area']: {...formData['elder_service_area'], value:selectedArea.join(), errorClass:"", errorMessage:""}});
    }
    else{
      setFormData({...formData, ['elder_service_area']: {...formData['elder_service_area'], value:"", errorClass:"form-error", errorMessage:"This field is required!"}});
    }
    setSelectedOptions(values);
  };



  const [formData, setFormData] = useState({
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
      if(element === "elder_gender" || element === "toilet_type" || element === "house_type" || element === "drinking_water_type"){
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

      var serviceArea                       = '{'+formData['elder_service_area'].value+'}';

      jsonData["elder_name"]                = formData['elder_name'].value;
      jsonData["elder_contact_number"]      = formData['elder_contact_number'].value;
      jsonData["elder_email_id"]            = formData['elder_email_id'].value;
      jsonData["elder_age"]                 = formData['elder_age'].value;
      jsonData["elder_address"]             = formData['elder_address'].value;
      jsonData["elder_address_2"]           = formData['elder_address_2'].value;
      jsonData["elder_state"]               = formData['elder_state'].value;
      jsonData["elder_postal_code"]         = formData['elder_postal_code'].value;
      jsonData["elder_landmark"]            = formData['elder_landmark'].value;
      jsonData["elder_city"]                = formData['elder_city'].value;
      jsonData["elder_father_name"]         = formData['elder_father_name'].value;
      jsonData["elder_education"]           = formData['elder_education'].value;;
      jsonData["elder_occupation"]          = formData['elder_occupation'].value;
      jsonData["elder_gender"]              = formData['elder_gender'].value;
      jsonData["elder_is_mobile_phone"]     = formData['is_personal_mobile_number'].value;
      jsonData["special_notes"]             = formData['special_notes'].value;
      jsonData["whatsapp"]                  = formData['whatsapp'].value;
      jsonData["service_area"]              = serviceArea;

      const response = await fetch(`${API_URL}/addUpdateElderProfile`, {
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

  useEffect(() => {
    if(systemContext.systemDetails.system_id){
      getMasterServicesArea();
    }
    // eslint-disable-next-line
  }, [systemContext.systemDetails.system_id]);

  useEffect(() => {

  }, [serviceAreaOption])

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
      setServiceAreaOption(optionsArray);
    }

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
        <form className="mt-3 select-box" name="elder_person_form" id="elder_person_form" onSubmit={handleFormSubmit}>
          <div className={`form-group ${formData["elder_name"].errorClass}`}>
            <label htmlFor="elder_name">Full Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} name="elder_name" id="elder_name" placeholder="Full Name" value={formData["elder_name"].value ? formData["elder_name"].value : ''} />
            <small className="error-mesg">{formData["elder_name"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_father_name"].errorClass}`}>
            <label htmlFor="elder_father_name">Name of Guardian<span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange}  name="elder_father_name" id="elder_father_name" value={formData["elder_father_name"].value ? formData["elder_father_name"].value : ''} placeholder="Name of Guardian" />
            <small className="error-mesg">{formData["elder_father_name"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_occupation"].errorClass}`}>
            <label htmlFor="elder_occupation">Occupation <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} name="elder_occupation" id="elder_occupation" value={formData["elder_occupation"].value ? formData["elder_occupation"].value : ''} placeholder="Occupation" />
            <small className="error-mesg">{formData["elder_occupation"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_gender"].errorClass}`}>
            <label>Gender  <span className="text-danger">*</span></label>
            <select className="form-control" value={formData["elder_gender"].value} name="elder_gender" id="elder_gender" onChange={handleChange}>
              <option value="0">Select</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
            <small className="error-mesg">{formData["elder_gender"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_age"].errorClass}`}>
            <label htmlFor="elder_age">Age <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="elder_age" id="elder_age" placeholder="Age" onChange={handleChange} value={formData["elder_age"].value ? formData["elder_age"].value : ''} />
            <small className="error-mesg">{formData["elder_age"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["is_personal_mobile_number"].errorClass}`}>
            <label className="no-style"><span className="d-block">Is elder's personal mobile number? <span className="text-danger">*</span></span> </label>
            <div className="d-flex">
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_y" name="is_personal_mobile_number" className="custom-control-input" value="t" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 't') ? true : false} />
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_y">Yes</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline mt-2">
                <input type="radio" id="personal_mobile_number_n" name="is_personal_mobile_number" className="custom-control-input" value="f" onChange={handleChange} checked={(formData["is_personal_mobile_number"].value === 'f') ? true : false}/>
                <label className="custom-control-label no-style" htmlFor="personal_mobile_number_n">No</label>
              </div>
            </div>
            <small className="error-mesg">{formData["is_personal_mobile_number"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_contact_number"].errorClass}`}>
            <label htmlFor="elder_contact_number">Phone No <span className="text-danger">*</span></label>
            <input type="tel" className="form-control" onChange={handleChange} value={formData["elder_contact_number"].value ? formData["elder_contact_number"].value : ''} name="elder_contact_number" id="elder_contact_number" placeholder="Phone No" />
            <small className="error-mesg">{formData["elder_contact_number"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["whatsapp"].errorClass}`}>
            <label htmlFor="whatsapp">WhatsApp No </label>
            <input type="tel" className="form-control" onChange={handleChange} value={formData["whatsapp"].value ? formData["whatsapp"].value : ''} name="whatsapp" id="whatsapp" placeholder="WhatsApp No" />
            <small className="error-mesg">{formData["whatsapp"].errorMessage}</small>
          </div>

          <div className="form-group">
            <label htmlFor="elder_email_id">Email </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_email_id"].value ? formData["elder_email_id"].value : ''} name="elder_email_id" id="elder_email_id" placeholder="Email" />
            {/* <small className="error-mesg">{formData["elder_email_id"].errorMessage}</small> */}
          </div>

          <div className={`form-group ${formData["elder_address"].errorClass}`}>
            <label htmlFor="elder_address">Address <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_address"].value ? formData["elder_address"].value : ''} name="elder_address" id="elder_address" placeholder="Address" />
            <small className="error-mesg">{formData["elder_address"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_address_2"].errorClass}`}>
            <label htmlFor="elder_address_2">Address 2 </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_address_2"].value ? formData["elder_address_2"].value : ''} name="elder_address_2" id="elder_address_2" placeholder="Address 2" />
            <small className="error-mesg">{formData["elder_address_2"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_landmark"].errorClass}`}>
            <label htmlFor="elder_landmark">Landmark <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_landmark"].value ? formData["elder_landmark"].value : ''} name="elder_landmark" id="elder_landmark" placeholder="Landmark" />
            <small className="error-mesg">{formData["elder_landmark"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_city"].errorClass}`}>
            <label htmlFor="elder_city">Village/Town/City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_city"].value ? formData["elder_city"].value : ''} name="elder_city" id="elder_city" placeholder="Village/Town/City" />
            <small className="error-mesg">{formData["elder_city"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_state"].errorClass}`}>
            <label htmlFor="elder_state">State <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_state"].value ? formData["elder_state"].value : ''} name="elder_state" id="elder_state" placeholder="State" />
            <small className="error-mesg">{formData["elder_state"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_postal_code"].errorClass}`}>
            <label htmlFor="elder_postal_code">Pincode <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_postal_code"].value ? formData["elder_postal_code"].value : ''} name="elder_postal_code" id="elder_postal_code" placeholder="Pincode" />
            <small className="error-mesg">{formData["elder_postal_code"].errorMessage}</small>
          </div>

          <div className={`form-group ${formData["elder_service_area"].errorClass}`}>
            <label>Service Area <span className='text-danger'> *</span></label>
            <Select className='form-control select-multi' isMulti value={selectedOptions}
        onChange={handleChange1} options={serviceAreaOption} />
              <small className="error-mesg">{formData["elder_service_area"].errorMessage}</small>
          </div>


          <div className={`form-group ${formData["elder_education"].errorClass}`}>
            <label htmlFor="elder_education">Education <span className="text-danger">*</span></label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["elder_education"].value ? formData["elder_education"].value : ''} name="elder_education" id="elder_education" placeholder="Education" />
            <small className="error-mesg">{formData["elder_education"].errorMessage}</small>
          </div>

          <div className="form-group">
            <label htmlFor="sub_volunteer_name">Sub Volunteer Name</label>
            <select className="form-control" name="sub_volunteer_name" id="sub_volunteer_name">
              <option value="1">Sub Volunteer1</option>
              <option value="2">Sub Volunteer2</option>
            </select>
          </div>

          <div className={`form-group ${formData["special_notes"].errorClass}`}>
            <label htmlFor="special_notes">Special Notes </label>
            <input type="text" className="form-control" onChange={handleChange} value={formData["special_notes"].value ? formData["special_notes"].value : ''} name="special_notes" id="special_notes" placeholder="Special Notes" />
            <small className="error-mesg">{formData["special_notes"].errorMessage}</small>
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